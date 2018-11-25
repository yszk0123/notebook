import React from 'react';
import { Route } from '../../routing/routing-type';

export const loginRoutes: Route[] = [
  {
    path: '/login',
    title: 'Login',
    async action(context) {
      const { Login } = await import('./components/Login');

      return {
        content: <Login />,
        loading: <Login />,
      };
    },
  },
];
