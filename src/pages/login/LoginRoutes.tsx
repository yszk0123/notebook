import React from 'react';
import { useAuthUI } from '../../application/adapters/firebase/UseAuthUIWithFirebase';
import { Route } from '../../application/routing';

export const loginRoutes: Route[] = [
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
