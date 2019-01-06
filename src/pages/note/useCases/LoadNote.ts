import * as firebase from 'firebase/app';
import { Nullable } from 'option-t/lib/Nullable';
import { UseCase } from '../../../app/type';
import { Note } from '../../../models/Note';
import { unwrapDocumentSnapshot } from '../../../utils/unwrapDocumentSnapshot';

interface LoadNoteInput {
  userId: string;
  noteId: string;
}

interface LoadNoteContext {
  firestore: firebase.firestore.Firestore;
}

export interface LoadNote extends UseCase<[LoadNoteInput], Nullable<Note>> {}

export function createLoadNote({ firestore }: LoadNoteContext): LoadNote {
  return async input => {
    const userRef = firestore.collection('users').doc(input.userId);
    const noteRef = userRef.collection('notes').doc(input.noteId);
    const note = await noteRef.get();
    return unwrapDocumentSnapshot<Note>(note);
  };
}
