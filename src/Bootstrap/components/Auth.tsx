import firebase from 'firebase/app';
import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import React, { useEffect, useState } from 'react';
import { LoadingPage } from '../../components/LoadingPage';
import { appConfig } from '../../config/AppConfig';
import { firebaseConfig } from '../../config/firebaseConfig';
import { Apollo } from './Apollo';
import { AuthUI } from './AuthUI';

enum LoginStatus {
  START = 'START',
  PROGRESS = 'PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

async function restoreToken(): Promise<Nullable<string>> {
  return window.localStorage.getItem(appConfig.appTokenStorageKey);
}

async function storeToken(token: string) {
  return window.localStorage.setItem(appConfig.appTokenStorageKey, token);
}

function useAuth(): {
  firebaseApp: Nullable<firebase.app.App>;
  token: Nullable<string>;
  loginStatus: LoginStatus;
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

  return { firebaseApp, token, loginStatus };
}

type Props = {};

export const Auth: React.FunctionComponent<Props> = ({ children }) => {
  const { firebaseApp, token, loginStatus } = useAuth();

  if (loginStatus === LoginStatus.START) {
    return <LoadingPage />;
  }

  if (loginStatus !== LoginStatus.SUCCESS || isNull(token)) {
    return <AuthUI firebaseApp={firebaseApp} />;
  }

  return <Apollo token={token}>{children}</Apollo>;
};
