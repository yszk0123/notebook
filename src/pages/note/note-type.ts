import { Nullable } from 'option-t/lib/Nullable';
import { Note } from '../../models/Note';
import { createAction, GetAction } from '../../redux';

export const enum NoteActionType {
  SAVE = 'SAVE',
  SAVE_SUCCESS = 'SAVE_SUCCESS',
  LOAD = 'LOAD',
  LOAD_SUCCESS = 'LOAD_SUCCESS',
}

export const noteActions = {
  save: createAction(NoteActionType.SAVE),
  saveSuccess: createAction(NoteActionType.SAVE_SUCCESS),
  load: createAction(NoteActionType.LOAD),
  loadSuccess: createAction(
    NoteActionType.LOAD_SUCCESS,
    (note: Nullable<Note>) => ({
      payload: { note },
    }),
  ),
};

export type NoteAction = GetAction<typeof noteActions>;

export interface NoteState {
  saving: boolean;
  loading: boolean;
  note: Nullable<Note>;
}
