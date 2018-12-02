import { InputRule } from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export type InputRuleFactory = (nodeType: NodeType) => InputRule;

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
  longTitle: string;
  run: Command;
  shortTitle: string;
  active(state: EditorState): boolean;
  enable(state: EditorState): boolean;
}
