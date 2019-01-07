import React from 'react';
import { Route } from '../../app/routing';

export const wordRoutes: Array<Route> = [
  {
    path: '/word',
    title: 'Word',
    async action(context) {
      const { WordPage } = await import('./components/WordPage');

      return {
        content: <WordPage />,
      };
    },
  },
];
