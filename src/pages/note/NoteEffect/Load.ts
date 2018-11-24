import * as firebase from 'firebase/app';
import { Nullable } from 'option-t/lib/Nullable';
import { Note } from '../../../models/Note';
import { unwrapDocumentSnapshot } from '../../../utils/unwrapDocumentSnapshot';
import { noteActions } from '../note-type';
import { NoteEffectCreator } from './NoteEffectType';

interface LoadInput {
  userId: string;
  noteId: string;
}

async function doLoad(
  input: LoadInput,
  db: firebase.firestore.Firestore,
): Promise<Nullable<Note>> {
  const userRef = db.collection('users').doc(input.userId);
  const noteRef = userRef.collection('notes').doc(input.noteId);
  const note = await noteRef.get();
  return unwrapDocumentSnapshot<Note>(note);
}

export const load: NoteEffectCreator<[LoadInput]> = input => async dispatch => {
  dispatch(noteActions.load());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const note = await doLoad(input, db);

  dispatch(noteActions.loadSuccess(note));
};
