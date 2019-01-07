import { Nullable } from 'option-t/lib/Nullable';
import { createAction } from '../../app/redux';
import { Note } from './entities/Note';

export const enum NoteActionType {
  COPY_TEXT = 'note/COPY_TEXT',
  COPY_TEXT_SUCCESS = 'note/COPY_TEXT_SUCCESS',
  LOAD = 'note/LOAD',
  LOAD_SUCCESS = 'note/LOAD_SUCCESS',
  SAVE = 'note/SAVE',
  SAVE_SUCCESS = 'note/SAVE_SUCCESS',
}

interface CopyTextPayload {
  text: string;
}
interface CopyText {
  type: NoteActionType.COPY_TEXT;
  payload: CopyTextPayload;
}
function copyText(payload: CopyTextPayload): CopyText {
  return {
    payload,
    type: NoteActionType.COPY_TEXT,
  };
}

interface CopyTextSuccess {
  type: NoteActionType.COPY_TEXT_SUCCESS;
}
const copyTextSuccess = createAction(NoteActionType.COPY_TEXT_SUCCESS);

interface Load {
  type: NoteActionType.LOAD;
}
const load = createAction(NoteActionType.LOAD);

interface LoadSuccessPayload {
  note: Nullable<Note>;
}
interface LoadSuccess {
  type: NoteActionType.LOAD_SUCCESS;
  payload: LoadSuccessPayload;
}
function loadSuccess(note: Nullable<Note>): LoadSuccess {
  return {
    payload: { note },
    type: NoteActionType.LOAD_SUCCESS,
  };
}

interface Save {
  type: NoteActionType.SAVE;
}
const save = createAction(NoteActionType.SAVE);

interface SaveSuccess {
  type: NoteActionType.SAVE_SUCCESS;
}
const saveSuccess = createAction(NoteActionType.SAVE_SUCCESS);

export const noteActions = {
  copyText,
  copyTextSuccess,
  load,
  loadSuccess,
  save,
  saveSuccess,
};

export type NoteAction =
  | CopyText
  | CopyTextSuccess
  | Load
  | LoadSuccess
  | Save
  | SaveSuccess;
