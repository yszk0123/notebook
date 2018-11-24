import React from 'react';
import { Route } from '../../routing/routing-type';
import { Counter } from './components/Counter';

export const counterRoutes: Route[] = [
  {
    path: '/counter',
    action(context) {
      return {
        content: <Counter />,
      };
    },
  },
];
