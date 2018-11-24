import React from 'react';
import { Route } from '../../routing/routing-type';

export const helloRoutes: Route[] = [
  {
    path: '',
    async action(context) {
      const { Hello } = await import('./components/Hello');

      return {
        content: <Hello />,
      };
    },
  },
];
