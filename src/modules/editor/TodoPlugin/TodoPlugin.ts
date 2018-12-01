import { isNull, Nullable } from 'option-t/lib/Nullable';
import { Node, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { buildTodoInputRules } from './TodoInputRule';
import { TodoNodeView } from './TodoNodeView';

export function isTodo(node: Node): boolean {
  return node.type.name === 'todo';
}

function isCheckbox(target: Nullable<EventTarget>): boolean {
  if (isNull(target)) {
    return false;
  }

  const element = unwrapUnsafeValue<HTMLElement>(target);
  return (
    element.nodeName.toLowerCase() === 'input' &&
    element.getAttribute('type') === 'checkbox'
  );
}

const clickPlugin = new Plugin({
  props: {
    nodeViews: {
      todo(node) {
        return new TodoNodeView(node);
      },
    },
    handleClickOn(view, _pos, node, nodePos, event: MouseEvent) {
      if (!isTodo(node) || !isCheckbox(event.target)) {
        return false;
      }

      // FIXME: Create toggle check command
      view.dispatch(
        view.state.tr.setNodeMarkup(nodePos, undefined, {
          checked: !node.attrs.checked,
        }),
      );

      return true;
    },
  },
});

export function buildTodoPlugins(schema: Schema): Plugin[] {
  return [buildTodoInputRules(schema), clickPlugin];
}
