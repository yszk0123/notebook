/**
 * @see https://github.com/atlassian/prosemirror-utils/blob/master/src/selection.js
 */
import { Nullable } from 'option-t/lib/Nullable';
import { Node } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';

interface FindResult {
  depth: number;
  node: Node;
  pos: number;
  start: number;
}

export function findParentNode(predicate: (node: Node) => boolean) {
  return (selection: Selection): Nullable<FindResult> => {
    const { $from } = selection;
    for (let i = $from.depth; i > 0; i -= 1) {
      const node = $from.node(i);
      if (predicate(node)) {
        return {
          depth: i,
          node,
          pos: i > 0 ? $from.before(i) : 0,
          start: $from.start(i),
        };
      }
    }

    return null;
  };
}
