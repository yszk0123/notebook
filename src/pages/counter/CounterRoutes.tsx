import React from 'react';
import { Route } from '../../routing/routing-type';

export const counterRoutes: Array<Route> = [
  {
    path: '/counter',
    title: 'Counter',
    async action(context) {
      const { CounterContainer } = await import('./CounterContainer');

      return {
        content: <CounterContainer />,
      };
    },
  },
];
