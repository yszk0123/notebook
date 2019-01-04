import React from 'react';
import { Route } from '../../routing/routing-type';

export const loginRoutes: Array<Route> = [
  {
    path: '/login',
    title: 'Login',
    async action(context) {
      const { LoginPage } = await import('./components/LoginPage');

      return {
        content: <LoginPage />,
        loading: <LoginPage />,
      };
    },
  },
];
