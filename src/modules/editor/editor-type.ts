import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export interface EditorContent {
  type: string;
  content: EditorContent[];
}

// tslint:disable-next-line:no-any
export type Command<S extends Schema = any> = (
  state: EditorState<S>,
  dispatch?: (tr: Transaction<S>) => void,
  editorView?: EditorView,
) => boolean;

export interface MenuItem {
  command: Command;
  shortTitle: string;
  longTitle: string;
}
