import firebase from 'firebase/app';
import { Nullable } from 'option-t/lib/Nullable';
import React from 'react';

export const FirebaseAppContext = React.createContext<
  Nullable<firebase.app.App>
>(null);

export const FirebaseAppProvider = FirebaseAppContext.Provider;
