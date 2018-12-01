import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { unwrapUnsafeValue } from '../../utils/unwrapUnsafeValue';
import { todoSchema } from './TodoPlugin';

type OrderedMap = ReturnType<typeof addListNodes>;

export function createSchema() {
  const basicNodes = unwrapUnsafeValue<OrderedMap>(basicSchema.spec.nodes);
  const nodes = addListNodes(basicNodes, 'paragraph block*', 'block');
  const customNodes = unwrapUnsafeValue<OrderedMap>(todoSchema.spec.nodes);

  return new Schema({
    marks: basicSchema.spec.marks,
    nodes: nodes.append(customNodes),
  });
}
