import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

export interface NodeAsJSON {
  type: string;
  content: NodeAsJSON[];
}

// tslint:disable-next-line:no-any
type Command<S extends Schema = any> = (
  state: EditorState<S>,
  dispatch?: (tr: Transaction<S>) => void,
) => boolean;

export interface MenuItem {
  command: Command;
  shortTitle: string;
  longTitle: string;
}
