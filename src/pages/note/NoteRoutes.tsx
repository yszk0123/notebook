import React from 'react';
import { Route } from '../../routing/routing-type';
import { createLoadNote, LoadNoteUseCase } from './useCases/LoadNoteUseCase';
import { createSaveNote, SaveNoteUseCase } from './useCases/SaveNoteUseCase';

export const noteRoutes: Array<Route> = [
  {
    path: '/note',
    title: 'Note',
    async action({ firestore }) {
      const { NoteContainer } = await import('./NoteContainer');
      const loadNote: LoadNoteUseCase = createLoadNote({ firestore });
      const saveNote: SaveNoteUseCase = createSaveNote({ firestore });

      return {
        content: <NoteContainer loadNote={loadNote} saveNote={saveNote} />,
      };
    },
  },
];
