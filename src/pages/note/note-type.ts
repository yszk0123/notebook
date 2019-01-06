import { Nullable } from 'option-t/lib/Nullable';
import { Note } from '../../models/Note';
import { createAction, GetAction } from '../../redux';

export const enum NoteActionType {
  COPY_TEXT = 'note/COPY_TEXT',
  COPY_TEXT_SUCCESS = 'note/COPY_TEXT_SUCCESS',
  LOAD = 'note/LOAD',
  LOAD_SUCCESS = 'note/LOAD_SUCCESS',
  SAVE = 'note/SAVE',
  SAVE_SUCCESS = 'note/SAVE_SUCCESS',
}

export const noteActions = {
  copyText: createAction(
    NoteActionType.COPY_TEXT,
    (payload: { text: string }) => ({ payload }),
  ),
  copyTextSuccess: createAction(NoteActionType.COPY_TEXT_SUCCESS),
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

export interface NoteGlobalState {
  note: NoteState;
}
