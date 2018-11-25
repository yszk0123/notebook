import { Nullable } from 'option-t/lib/Nullable';
import { Note } from '../../models/Note';
import { createAction, GetAction } from '../../redux';

export const enum NoteActionType {
  LOAD = 'LOAD',
  LOAD_SUCCESS = 'LOAD_SUCCESS',
  SAVE = 'SAVE',
  SAVE_SUCCESS = 'SAVE_SUCCESS',
}

export const noteActions = {
  load: createAction(NoteActionType.LOAD),
  loadSuccess: createAction(
    NoteActionType.LOAD_SUCCESS,
    (note: Nullable<Note>) => ({
      payload: { note },
    }),
  ),
  save: createAction(NoteActionType.SAVE),
  saveSuccess: createAction(NoteActionType.SAVE_SUCCESS),
};

export type NoteAction = GetAction<typeof noteActions>;

export interface NoteState {
  loading: boolean;
  note: Nullable<Note>;
  saving: boolean;
}
