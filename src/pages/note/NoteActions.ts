import { Nullable } from 'option-t/lib/Nullable';
import {
  createAction,
  createActionWithPayload,
  GetAction,
} from '../../app/redux';
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
const copyText = createActionWithPayload<
  CopyTextPayload,
  NoteActionType.COPY_TEXT
>(NoteActionType.COPY_TEXT);

const copyTextSuccess = createAction(NoteActionType.COPY_TEXT_SUCCESS);

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

const save = createAction(NoteActionType.SAVE);

const saveSuccess = createAction(NoteActionType.SAVE_SUCCESS);

export const noteActions = {
  copyText,
  copyTextSuccess,
  load,
  loadSuccess,
  save,
  saveSuccess,
};

export type NoteAction = GetAction<typeof noteActions>;
