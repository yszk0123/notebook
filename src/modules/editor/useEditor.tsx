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
  editorState,
  editorRef,
  onChange,
  onFocus = noop,
  onBlur = noop,
}: Props) => {
  const [editorView] = useState(() =>
    createEditorView({ editorState, onChange }),
  );

  useLayoutEffect(
    () => {
      editorView.updateState(editorState);
    },
    [editorView, editorState],
  );

  useEffect(() => {
    if (isNull(editorRef.current)) {
      return;
    }
    editorRef.current.appendChild(editorView.dom);
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
