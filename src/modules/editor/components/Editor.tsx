import { isNull, Nullable } from 'option-t/lib/Nullable';
import { isNotUndefined } from 'option-t/lib/Undefinable';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '../../../styled-components';
import { noop } from '../../../utils/noop';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { EditorContent } from '../editor-type';

const ProseMirrorWrapper = styled.div`
  .ProseMirror {
    padding: 4px 8px 4px 14px;
    line-height: 1.2;
  }

  .ProseMirror p {
    margin: 0;
  }

  .ProseMirror-focused {
    outline: none;
  }
`;

type OnChange = (getContent: () => Nullable<EditorContent>) => void;

interface RenderProps {
  editor: JSX.Element;
  editorView: EditorView;
}

interface Props {
  className?: string;
  state: EditorState;
  onChange: OnChange;
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
  const [editorView] = useState(
    () =>
      new EditorView(undefined, {
        state,
        dispatchTransaction(tr) {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          if (tr.docChanged) {
            onChange(getContent);
          }

          function getContent(): Nullable<EditorContent> {
            return unwrapUnsafeValue<EditorContent>(
              editorView.state.doc.toJSON(),
            );
          }
        },
      }),
  );

  useEffect(
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
      editorView.destroy();
      editorView.dom.removeEventListener('focus', onFocus);
      editorView.dom.removeEventListener('blur', onBlur);
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
