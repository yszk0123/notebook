import React from 'react';
import { Route } from '../../routing/routing-type';

export const noteRoutes: Array<Route> = [
  {
    path: '/note',
    title: 'Note',
    async action(_context) {
      const { NoteContainer } = await import('./NoteContainer');

      return {
        content: <NoteContainer />,
      };
    },
  },
];
