import { isNull } from 'option-t/lib/Nullable';
import { isNotUndefined } from 'option-t/lib/Undefinable';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from '../../../styled-components';
import { noop } from '../../../utils/noop';
import { createEditorView } from '../EditorView';

const ProseMirrorWrapper = styled.div`
  .ProseMirror {
    padding: 4px 8px 4px 14px;
    line-height: 1.2;

    p {
      margin: 0;
    }

    input[type='checkbox']:checked + span {
      opacity: ${({ theme }) => theme.inactiveOpacity};
      text-decoration: line-through;
    }
  }

  .ProseMirror-focused {
    outline: none;
  }
`;

interface RenderProps {
  editor: JSX.Element;
  editorView: EditorView;
}

interface Props {
  className?: string;
  state: EditorState;
  onChange: (
    nextState: EditorState,
    prevState: EditorState,
    docChanged: boolean,
  ) => void;
  onFocus?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  children?: (props: RenderProps) => JSX.Element;
}

export const Editor: React.FunctionComponent<Props> = ({
  className,
  children,
  state,
  onChange,
  onFocus = noop,
  onBlur = noop,
}) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const editor = <ProseMirrorWrapper className={className} ref={ref} />;

  return isNotUndefined(children)
    ? children({
        editor,
        editorView,
      })
    : editor;
};
