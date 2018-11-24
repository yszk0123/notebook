import * as firebase from 'firebase/app';
import { AppState } from '../../app/app-type';
import { Note } from '../../models/Note';
import { EffectCreator } from '../../redux';
import { NoteAction, noteActions } from './note-type';

type NoteEffectCreator<Args extends any[]> = EffectCreator<
  AppState,
  NoteAction,
  Args
>;

interface SaveInput {
  userId: string;
  note: Note;
}

async function doSave(input: SaveInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);
  const noteRef = await userRef.collection('notes').doc(input.note.id);
  await noteRef.set(input.note);
}

const save: NoteEffectCreator<[SaveInput]> = input => async dispatch => {
  dispatch(noteActions.save());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doSave(input, db);

  dispatch(noteActions.saveSuccess());
};

export const noteEffects = { save };
