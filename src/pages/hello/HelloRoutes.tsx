import React from 'react';
import { Route } from '../../app/routing';

export const helloRoutes: Route[] = [
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
