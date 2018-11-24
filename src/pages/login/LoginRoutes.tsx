import React from 'react';
import { Route } from '../../routing/routing-type';
import { Login } from './components/Login';

export const loginRoutes: Route[] = [
  {
    path: '/counter',
    action(context) {
      return {
        content: <Login />,
      };
    },
  },
];
