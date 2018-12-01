import { Nullable } from 'option-t/lib/Nullable';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { unwrapUnsafeValue } from '../../utils/unwrapUnsafeValue';
import { EditorContent } from './editor-type';
import { TodoNodeView } from './TodoPlugin';

export type OnChange = (getContent: () => Nullable<EditorContent>) => void;

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
    state,
  });

  function getContent(): Nullable<EditorContent> {
    return unwrapUnsafeValue<EditorContent>(editorView.state.doc.toJSON());
  }

  return editorView;
}
