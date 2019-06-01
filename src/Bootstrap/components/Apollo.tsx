import firebase from 'firebase/app';
import { isNull, Nullable } from 'option-t/lib/Nullable';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { firebaseConfig } from '../../config/firebaseConfig';
import { useApolloClient } from '../ApolloFactory';
import { AuthUI } from './AuthUI';

function useAuth(): {
  firebaseApp: Nullable<firebase.app.App>;
  getToken: () => Nullable<string>;
  isLoggedIn: boolean;
} {
  const tokenRef = useRef<string>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState<Nullable<firebase.app.App>>(null);

  useEffect(() => {
    const newApp = firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (!firebaseUser) {
        return;
      }

      tokenRef.current = await firebaseUser.getIdToken(true);
      setIsLoggedIn(true);
    });

    setFirebaseApp(newApp);
  }, []);

  const getToken = useCallback(() => {
    return tokenRef.current || null;
  }, [tokenRef]);

  return { firebaseApp, getToken, isLoggedIn };
}

type Props = {};

export const Apollo: React.FunctionComponent<Props> = ({ children }) => {
  const { firebaseApp, getToken, isLoggedIn } = useAuth();
  const client = useApolloClient(getToken);

  if (!isLoggedIn || isNull(client)) {
    return <AuthUI firebaseApp={firebaseApp} />;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
