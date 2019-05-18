import firebase from 'firebase/app';
import { uniq } from 'lodash';
import { getWordGateway, postWordGateway } from 'OLD_pages/word/gateways/WordGateway';
import { isNotNull } from 'option-t/lib/Nullable';
import { filter, fromPromise, map } from 'typeless/rx';
import { NoteActions, NoteState, useNoteModule } from './NoteInterface';

// FIXME
const db: firebase.firestore.Firestore = null as any;

useNoteModule
  .epic()
  .on(NoteActions.add, ({ userId, content }) =>
    fromPromise(postWordGateway({ userId, content }, { db })).pipe(
      map(note => NoteActions.addSuccess(note)),
    ),
  )
  .on(NoteActions.load, ({ userId, noteId }) =>
    fromPromise(getWordGateway({ userId, wordId: noteId }, { db })).pipe(
      filter(isNotNull),
      map(note => NoteActions.loadSuccess(note)),
    ),
  );

const initialState: NoteState = {
  loading: true,
  noteIds: [],
  notesById: {},
  outdatedNoteIds: [],
  saving: false,
};

useNoteModule
  .reducer(initialState)
  .on(NoteActions.add, state => {
    state.loading = true;
  })
  .on(NoteActions.addSuccess, (state, { note }) => {
    state.loading = false;
    state.noteIds = uniq([note.id, ...state.noteIds]);
    state.notesById[note.id] = note;
  });
