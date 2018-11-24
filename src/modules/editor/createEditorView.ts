// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
import { DOMParser, Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const schema = new Schema({
  nodes: addListNodes(
    basicSchema.spec.nodes as any,
    'paragraph block*',
    'block',
  ),
  marks: basicSchema.spec.marks,
});

export function createEditorView(editor: HTMLElement, content: HTMLElement) {
  const view = new EditorView(editor, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(content),
      plugins: exampleSetup({ schema }),
    }),
  });

  return view;
}
