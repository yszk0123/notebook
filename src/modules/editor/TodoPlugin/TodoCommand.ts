import { isNull } from 'option-t/lib/Nullable';
import { isNotUndefined } from 'option-t/lib/Undefinable';
import { Node } from 'prosemirror-model';
import { Command } from '../EditorType';
import { findParentNode } from '../utils/findParentNode';

const findTodo = findParentNode((node: Node) => node.type.name === 'todo');

export const toggleCheckbox: Command = (state, dispatch) => {
  if (!isNotUndefined(dispatch)) {
    return false;
  }

  const result = findTodo(state.selection);
  if (isNull(result)) {
    return false;
  }

  const { node, pos } = result;
  const attrs = { checked: !node.attrs.checked };
  dispatch(state.tr.setNodeMarkup(pos, undefined, attrs));
  return true;
};
