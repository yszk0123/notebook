import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { buildTodoPlugins } from '../TodoPlugin';
import { buildInputRules } from './DefaultInputRule';
import { buildKeymap } from './DefaultKeymap';

export function buildPlugins(schema: Schema): Array<Plugin<Schema>> {
  return [
    buildInputRules(schema),
    ...buildTodoPlugins(schema),
    keymap(buildKeymap(schema, {})),
    keymap(baseKeymap),
    history(),
    dropCursor(),
    gapCursor(),
  ];
}
