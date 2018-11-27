import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorContent } from './editor-type';

export function createStateFromContent(
  schema: Schema,
  content: Nullable<EditorContent>,
) {
  const doc = schema.nodeFromJSON(
    unwrapOrFromNullable(content, { type: 'doc', content: [] }),
  );

  return EditorState.create({
    doc,
    plugins: exampleSetup({ schema, menuBar: false }),
  });
}
