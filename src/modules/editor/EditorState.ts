import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorContent } from './editor-type';
import { buildInputRules } from './InputRule';
import { buildKeymap } from './Keymap';

function buildPlugins(schema: Schema): Array<Plugin<Schema>> {
  return [
    buildInputRules(schema),
    keymap(buildKeymap(schema, {})),
    keymap(baseKeymap),
    history(),
    dropCursor(),
    gapCursor(),
  ];
}

export function createStateFromContent(
  schema: Schema,
  content: Nullable<EditorContent>,
) {
  const doc = schema.nodeFromJSON(
    unwrapOrFromNullable(content, { type: 'doc', content: [] }),
  );

  return EditorState.create({
    doc,
    plugins: buildPlugins(schema),
  });
}
