import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import { isNull, Nullable } from 'option-t/lib/Nullable';
import React, { useEffect, useRef } from 'react';
import { firebaseAuthUIConfig } from '../../config/firebaseAuthUIConfig';

function useAuthUI(
  firebaseApp: Nullable<firebase.app.App>,
): {
  authUIRef: React.RefObject<HTMLDivElement>;
} {
  const authUIRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNull(firebaseApp)) {
      return;
    }

    if (!authUIRef.current) {
      return;
    }

    const authUI = new firebaseui.auth.AuthUI(firebaseApp.auth());
    authUI.start(authUIRef.current, firebaseAuthUIConfig);

    return () => {
      authUI.delete();
    };
  }, [firebaseApp]);

  return { authUIRef };
}

type Props = {
  firebaseApp: Nullable<firebase.app.App>;
};

export const AuthUI: React.FunctionComponent<Props> = ({ firebaseApp }) => {
  const { authUIRef } = useAuthUI(firebaseApp);

  return <div ref={authUIRef} />;
};
