import React from 'react';
import { Route } from '../../routing/routing-type';
import { createLoadNote } from './useCases/LoadNote';
import { createSaveNote } from './useCases/SaveNote';

export const noteRoutes: Array<Route> = [
  {
    path: '/note',
    title: 'Note',
    async action({ firestore }) {
      const { NoteContainer } = await import('./NoteContainer');
      const loadNote = createLoadNote({ firestore });
      const saveNote = createSaveNote({ firestore });

      return {
        content: <NoteContainer loadNote={loadNote} saveNote={saveNote} />,
      };
    },
  },
];
