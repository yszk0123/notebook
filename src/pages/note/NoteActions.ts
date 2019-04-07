import { Nullable } from 'option-t/lib/Nullable';
import { action, GetAction } from '../../application/DucksType';
import { Note } from './entities/Note';

export const enum NoteActionType {
  COPY_TEXT = 'note/COPY_TEXT',
  COPY_TEXT_SUCCESS = 'note/COPY_TEXT_SUCCESS',
  LOAD = 'note/LOAD',
  LOAD_SUCCESS = 'note/LOAD_SUCCESS',
  SAVE = 'note/SAVE',
  SAVE_SUCCESS = 'note/SAVE_SUCCESS',
}

export const noteActions = {
  copyText: action<NoteActionType.COPY_TEXT, { text: string }>(NoteActionType.COPY_TEXT),
  copyTextSuccess: action(NoteActionType.COPY_TEXT_SUCCESS),
  load: action(NoteActionType.LOAD),
  loadSuccess: action<NoteActionType.LOAD_SUCCESS, { note: Nullable<Note> }>(
    NoteActionType.LOAD_SUCCESS,
  ),
  save: action(NoteActionType.SAVE),
  saveSuccess: action(NoteActionType.SAVE_SUCCESS),
};

export type NoteAction = GetAction<typeof noteActions>;
