import React from 'react';
import { Route } from '../../routing/routing-type';

export const counterRoutes: Route[] = [
  {
    path: '/counter',
    title: 'Counter',
    async action(context) {
      const { CounterPage } = await import('./components/CounterPage');

      return {
        content: <CounterPage />,
      };
    },
  },
];
