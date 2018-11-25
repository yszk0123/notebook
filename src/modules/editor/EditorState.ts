// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { NodeAsJSON } from './editor-type';

const schema = new Schema({
  marks: basicSchema.spec.marks,
  nodes: addListNodes(
    // FIXME: Avoid any (#6)
    // tslint:disable-next-line:no-any
    basicSchema.spec.nodes as any,
    'paragraph block*',
    'block',
  ),
});

export function createStateFromJSON(data: NodeAsJSON) {
  return EditorState.create({
    doc: schema.nodeFromJSON(data),
    plugins: exampleSetup({ schema }),
  });
}
