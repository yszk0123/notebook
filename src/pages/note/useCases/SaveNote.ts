import { UseCase } from '../../../app/type';
import { Note } from '../../../models/Note';

interface SaveNoteInput {
  userId: string;
  note: Note;
}

export interface SaveNote extends UseCase<SaveNoteInput, void> {}

interface SaveNoteContext {
  firestore: firebase.firestore.Firestore;
}

export function createSaveNote({ firestore }: SaveNoteContext): SaveNote {
  return async (input: SaveNoteInput) => {
    const userRef = firestore.collection('users').doc(input.userId);
    const noteRef = userRef.collection('notes').doc(input.note.id);
    await noteRef.set(input.note);
  };
}
