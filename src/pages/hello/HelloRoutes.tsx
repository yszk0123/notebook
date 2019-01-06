import React from 'react';
import { Route } from '../../app/routing/routing-type';

export const helloRoutes: Array<Route> = [
  {
    path: '/hello',
    title: 'Hello',
    async action(context) {
      const { HelloContainer } = await import('./HelloContainer');

      return {
        content: <HelloContainer />,
      };
    },
  },
];
