import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { NodeAsJSON } from './editor-type';

export function createStateFromJSON(
  schema: Schema,
  data: Nullable<NodeAsJSON>,
) {
  const doc = schema.nodeFromJSON(
    unwrapOrFromNullable(data, { type: 'doc', content: [] }),
  );

  return EditorState.create({
    doc,
    plugins: exampleSetup({ schema }),
  });
}
