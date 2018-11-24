import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { NodeAsJSON } from './editor-type';

const schema = new Schema({
  nodes: addListNodes(
    basicSchema.spec.nodes as any,
    'paragraph block*',
    'block',
  ),
  marks: basicSchema.spec.marks,
});

export function createStateFromJSON(data: NodeAsJSON) {
  return EditorState.create({
    doc: schema.nodeFromJSON(data),
    plugins: exampleSetup({ schema }),
  });
}

export function createEditorView(
  editor: HTMLElement,
  data: Nullable<NodeAsJSON>,
) {
  const state = createStateFromJSON(
    unwrapOrFromNullable(data, { type: 'doc', content: [] }),
  );
  const view = new EditorView(editor, { state });
  return view;
}
