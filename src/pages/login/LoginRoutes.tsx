import React from 'react';
import { useAuthUI } from '../../app/adapters/firebase/UseAuthUIWithFirebase';
import { Route } from '../../routing/routing-type';

export const loginRoutes: Array<Route> = [
  {
    path: '/login',
    title: 'Login',
    async action(context) {
      const { LoginPage } = await import('./components/LoginPage');

      return {
        content: <LoginPage useAuthUI={useAuthUI} />,
        loading: <LoginPage useAuthUI={useAuthUI} />,
      };
    },
  },
];
