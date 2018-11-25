import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';
import { EditorView } from 'prosemirror-view';
import { NodeAsJSON } from './editor-type';
import { createStateFromJSON } from './EditorState';

export function createEditorView(
  editor: HTMLElement,
  data: Nullable<NodeAsJSON>,
) {
  const state = createStateFromJSON(
    unwrapOrFromNullable(data, { type: 'doc', content: [] }),
  );
  const view = new EditorView(editor, { state });
  return view;
}
