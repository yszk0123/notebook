import { createAction, GetAction } from '../../redux';

export const enum NoteActionType {
  SAVE = 'SAVE',
  SAVE_SUCCESS = 'SAVE_SUCCESS',
}

export const noteActions = {
  save: createAction(NoteActionType.SAVE),
  saveSuccess: createAction(NoteActionType.SAVE_SUCCESS),
};

export type NoteAction = GetAction<typeof noteActions>;

export interface NoteState {
  saving: boolean;
}
