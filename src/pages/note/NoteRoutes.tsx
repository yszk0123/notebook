import React from 'react';
import { Route } from '../../routing/routing-type';

export const noteRoutes: Array<Route> = [
  {
    path: '/note',
    title: 'Note',
    async action(context) {
      const { NotePage } = await import('./components/NotePage');

      return {
        content: <NotePage />,
      };
    },
  },
];
