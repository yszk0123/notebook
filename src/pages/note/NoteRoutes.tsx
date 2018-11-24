import React from 'react';
import { Route } from '../../routing/routing-type';

export const noteRoutes: Route[] = [
  {
    path: '/note',
    async action(context) {
      const { Note } = await import('./components/Note');

      return {
        content: <Note />,
      };
    },
  },
];
