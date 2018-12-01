import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { unwrapUnsafeValue } from '../../utils/unwrapUnsafeValue';

type OrderedMap = ReturnType<typeof addListNodes>;

export function createSchema() {
  const basicNodes = unwrapUnsafeValue<OrderedMap>(basicSchema.spec.nodes);
  const nodes = addListNodes(basicNodes, 'paragraph block*', 'block');

  return new Schema({
    marks: basicSchema.spec.marks,
    nodes,
  });
}
