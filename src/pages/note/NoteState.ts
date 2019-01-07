import { Nullable } from 'option-t/lib/Nullable';
import { Note } from './entities/Note';

export interface NoteLocalState {
  loading: boolean;
  note: Nullable<Note>;
  saving: boolean;
}

export interface NoteGlobalState {
  note: NoteLocalState;
}
