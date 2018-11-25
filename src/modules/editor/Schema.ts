import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

export function createSchema() {
  return new Schema({
    marks: basicSchema.spec.marks,
    nodes: addListNodes(
      // FIXME: Avoid any (#6)
      // tslint:disable-next-line:no-any
      basicSchema.spec.nodes as any,
      'paragraph block*',
      'block',
    ),
  });
}
