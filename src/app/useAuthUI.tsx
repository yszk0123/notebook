import firebaseui from 'firebaseui';
import React, { useContext, useEffect } from 'react';
import { firebaseAuthUIConfig } from '../config/firebaseAuthUIConfig';
import { FirebaseAppContext } from '../FirebaseAppContext';

export function useAuthUI(ref: React.RefObject<HTMLElement>) {
  const app = useContext(FirebaseAppContext);
  if (!app) {
    throw new Error('app must be initialized');
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const authUi = new firebaseui.auth.AuthUI(app.auth());
    authUi.start(ref.current, firebaseAuthUIConfig);
    return () => {
      authUi.delete();
    };
  }, []);
}
