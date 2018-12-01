import { Nullable } from 'option-t/lib/Nullable';
import { mapOrElseForNullable } from 'option-t/lib/Nullable/mapOrElse';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Node, Schema } from 'prosemirror-model';
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

function createEmptyDoc(schema: Schema): Node {
  return schema.node('doc', {}, [schema.node('paragraph', {}, [])]);
}

export function createStateFromContent(
  schema: Schema,
  content: Nullable<EditorContent>,
) {
  const doc = mapOrElseForNullable(
    content,
    () => createEmptyDoc(schema),
    schema.nodeFromJSON,
  );

  return EditorState.create({
    doc,
    plugins: buildPlugins(schema),
  });
}
