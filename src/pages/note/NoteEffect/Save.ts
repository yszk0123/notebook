import * as firebase from 'firebase/app';
import { Note } from '../../../models/Note';
import { noteActions } from '../note-type';
import { NoteEffectCreator } from './NoteEffectType';

interface SaveInput {
  userId: string;
  note: Note;
}

async function doSave(input: SaveInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);
  const noteRef = userRef.collection('notes').doc(input.note.id);
  await noteRef.set(input.note);
}

export const save: NoteEffectCreator<[SaveInput]> = input => async dispatch => {
  dispatch(noteActions.save());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doSave(input, db);

  dispatch(noteActions.saveSuccess());
};
