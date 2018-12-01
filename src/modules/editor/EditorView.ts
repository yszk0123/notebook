import { isNull, Nullable } from 'option-t/lib/Nullable';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { unwrapUnsafeValue } from '../../utils/unwrapUnsafeValue';
import { EditorContent } from './editor-type';
import { TodoNodeView } from './TodoPlugin';

export type OnChange = (getContent: () => Nullable<EditorContent>) => void;

function isTodo(node: Node): boolean {
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

export function createEditorView(state: EditorState, onChange: OnChange) {
  const editorView = new EditorView(undefined, {
    dispatchTransaction(tr) {
      const newState = editorView.state.apply(tr);
      editorView.updateState(newState);
      if (tr.docChanged) {
        onChange(getContent);
      }
    },
    nodeViews: {
      todo(node) {
        return new TodoNodeView(node);
      },
    },
    handleClickOn(view, pos, node, nodePos, event: MouseEvent) {
      if (!isTodo(node) || !isCheckbox(event.target)) {
        return false;
      }

      view.dispatch(
        view.state.tr.setNodeMarkup(nodePos, undefined, {
          checked: !node.attrs.checked,
        }),
      );

      return true;
    },
    state,
  });

  function getContent(): Nullable<EditorContent> {
    return unwrapUnsafeValue<EditorContent>(editorView.state.doc.toJSON());
  }

  return editorView;
}
