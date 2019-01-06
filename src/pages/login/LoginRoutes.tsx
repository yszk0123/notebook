import React from 'react';
import { useAuthUI } from '../../app/adapters/firebase/UseAuthUIWithFirebase';
import { Route } from '../../app/routing/routing-type';

export const loginRoutes: Array<Route> = [
  {
    path: '/login',
    title: 'Login',
    async action(_context) {
      const { LoginContainer } = await import('./LoginContainer');

      return {
        content: <LoginContainer useAuthUI={useAuthUI} />,
        loading: <LoginContainer useAuthUI={useAuthUI} />,
      };
    },
  },
];
