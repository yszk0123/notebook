import React from 'react';
import { Route } from '../../routing/routing-type';

export const loginRoutes: Route[] = [
  {
    path: '/login',
    async action(context) {
      const { Login } = await import('./components/Login');

      return {
        loading: <Login />,
        content: <Login />,
      };
    },
  },
];
