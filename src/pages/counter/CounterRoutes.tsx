import React from 'react';
import { Route } from '../../app/routing';

export const counterRoutes: Route[] = [
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
