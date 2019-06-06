import firebase from 'firebase/app';
import React, { useEffect, useMemo, useState } from 'react';
import { Storage } from '../../application/Storage/StorageForWeb';
import { isNotNull, isNull, Nullable } from '../../application/utils/Maybe';
import { LoadingPage } from '../../components/LoadingPage';
import { appConfig } from '../../config/AppConfig';
import { firebaseConfig } from '../../config/firebaseConfig';
import { AuthController, AuthProvider } from '../AuthContext';
import { Apollo } from './Apollo';
import { AuthUI } from './AuthUI';

enum LoginStatus {
  START = 'START',
  PROGRESS = 'PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

const storage = new Storage();

async function restoreToken(): Promise<Nullable<string>> {
  return storage.getItem(appConfig.appTokenStorageKey);
}

async function storeToken(token: string) {
  return storage.setItem(appConfig.appTokenStorageKey, token);
}

async function clearToken() {
  return storage.removeItem(appConfig.appTokenStorageKey);
}

function useAuth(): {
  firebaseApp: Nullable<firebase.app.App>;
  token: Nullable<string>;
  loginStatus: LoginStatus;
  authController: AuthController;
} {
  const [token, setToken] = useState<Nullable<string>>(null);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.START);
  const [firebaseApp, setFirebaseApp] = useState<Nullable<firebase.app.App>>(null);

  useEffect(() => {
    function onComplete(newToken: string) {
      setToken(newToken);
      setLoginStatus(LoginStatus.SUCCESS);
    }

    async function doLogin() {
      const newApp = firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();
      setFirebaseApp(newApp);

      auth.onAuthStateChanged(async firebaseUser => {
        if (!firebaseUser) {
          setLoginStatus(LoginStatus.FAILURE);
          return;
        }

        const newToken = await firebaseUser.getIdToken(true);
        storeToken(newToken);
        onComplete(newToken);
      });

      const storedToken = await restoreToken();
      if (isNotNull(storedToken)) {
        onComplete(storedToken);
        return;
      }

      setLoginStatus(LoginStatus.PROGRESS);
    }

    doLogin();
  }, []);

  const authController: AuthController = useMemo(() => {
    return {
      logout() {
        clearToken();
        setToken(null);
        setLoginStatus(LoginStatus.PROGRESS);
      },
    };
  }, []);

  return { firebaseApp, token, loginStatus, authController };
}

type Props = {};

export const Auth: React.FunctionComponent<Props> = ({ children }) => {
  const { firebaseApp, token, loginStatus, authController } = useAuth();

  if (loginStatus === LoginStatus.START) {
    return <LoadingPage />;
  }

  if (loginStatus !== LoginStatus.SUCCESS || isNull(token)) {
    return <AuthUI firebaseApp={firebaseApp} />;
  }

  return (
    <AuthProvider value={authController}>
      <Apollo token={token}>{children}</Apollo>
    </AuthProvider>
  );
};
