import firebase from 'firebase/app';
import React from 'react';

export const FirebaseAppContext = React.createContext<firebase.app.App | null>(
  null,
);

export const FirebaseAppProvider = FirebaseAppContext.Provider;
