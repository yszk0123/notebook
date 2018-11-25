import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export function createEditorView(editor: HTMLElement, state: EditorState) {
  const view = new EditorView(editor, { state });
  return view;
}
