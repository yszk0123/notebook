import { createModule } from 'typeless';
import { Note, NoteID } from './entities/Note';

export const [useNoteModule, NoteActions, getNoteState] = createModule(Symbol('note'))
  .withActions({
    add: (userId: string, content: string) => ({ payload: { userId, content } }),
    addSuccess: (note: Note) => ({ payload: { note } }),
    load: (userId: string, noteId: string) => ({ payload: { userId, noteId } }),
    loadSuccess: (note: Note, noteId: string) => ({ payload: { note, noteId } }),
  })
  .withState<NoteState>();

export interface NoteState {
  loading: boolean;
  saving: boolean;
  outdatedNoteIds: NoteID[];
  noteIds: NoteID[];
  notesById: Record<NoteID, Note>;
}
