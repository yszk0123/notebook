import React from 'react';
import { Route } from '../../routing/routing-type';

export const counterRoutes: Route[] = [
  {
    path: '/counter',
    title: 'Counter',
    async action(context) {
      const { Counter } = await import('./components/Counter');

      return {
        content: <Counter />,
      };
    },
  },
];
