import { isNull } from 'option-t/lib/Nullable';
import { EditorState } from 'prosemirror-state';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { noop } from '../../utils/noop';
import { createEditorView } from './EditorView';

interface Props {
  editorState: EditorState;
  editorRef: React.RefObject<HTMLElement>;
  onChange: (
    nextState: EditorState,
    prevState: EditorState,
    docChanged: boolean,
  ) => void;
  onFocus?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export const useEditor = ({
  editorState: state,
  editorRef: ref,
  onChange,
  onFocus = noop,
  onBlur = noop,
}: Props) => {
  const [editorView] = useState(() => createEditorView({ state, onChange }));

  useLayoutEffect(
    () => {
      editorView.updateState(state);
    },
    [editorView, state],
  );

  useEffect(() => {
    if (isNull(ref.current)) {
      return;
    }
    ref.current.appendChild(editorView.dom);
    editorView.update({ ...editorView.props });
    editorView.dom.addEventListener('focus', onFocus);
    editorView.dom.addEventListener('blur', onBlur);

    return () => {
      editorView.dom.removeEventListener('focus', onFocus);
      editorView.dom.removeEventListener('blur', onBlur);
      editorView.destroy();
    };
  }, []);

  return editorView;
};
