import firebaseui from 'firebaseui';
import React, { useContext, useEffect, useRef } from 'react';
import { authUiConfig } from '../../authUiConfig';
import { Text } from '../../components/Text';
import { FirebaseAppContext } from '../../FirebaseAppContext';

interface Props {}

export const Login: React.FunctionComponent<Props> = () => {
  const app = useContext(FirebaseAppContext);
  if (!app) {
    throw new Error('app must be initialized');
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const authUi = new firebaseui.auth.AuthUI(app.auth());

    authUi.start(ref.current, authUiConfig);

    return () => {
      authUi.delete();
    };
  }, []);

  return (
    <div>
      <Text>Login</Text>
      <div ref={ref} />
    </div>
  );
};
