import { NodeSpec } from 'prosemirror-model';
import { unwrapUnsafeValue } from '../../../application/utils/unwrapUnsafeValue';

const todo: NodeSpec = {
  attrs: { checked: { default: false } },
  content: 'paragraph',
  defining: true,
  group: 'block',
  parseDOM: [
    {
      tag: 'li.todo',
      getAttrs(dom) {
        if (typeof dom === 'string') {
          return {};
        }

        const element = unwrapUnsafeValue<HTMLElement>(dom);

        return {
          checked: element.hasAttribute('checked')
            ? Boolean(element.getAttribute('checked'))
            : false,
        };
      },
    },
  ],
};

export const todoSchema = {
  spec: {
    nodes: {
      todo,
    },
  },
};
