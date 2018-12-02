import React from 'react';
import { Route } from '../../routing/routing-type';

export const helloRoutes: Route[] = [
  {
    path: '/hello',
    title: 'Hello',
    async action(context) {
      const { HelloPage } = await import('./components/HelloPage');

      return {
        content: <HelloPage />,
      };
    },
  },
];
