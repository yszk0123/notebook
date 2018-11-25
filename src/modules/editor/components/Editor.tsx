import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '../../../styled-components';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { EditorContent } from '../editor-type';
import { createEditorView } from '../EditorView';

const ProseMirrorWrapper = styled.div`
  & {
    .ProseMirror-menubar-wrapper {
      border: 2px solid silver;
    }

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
  }
`;

type OnChange = (getContent: () => Nullable<EditorContent>) => void;

interface Props {
  className?: string;
  state: EditorState;
  onChange: OnChange;
}

function useEditorViewUpdate(
  editorView: Nullable<EditorView>,
  onChange: OnChange,
) {
  useEffect(
    () => {
      if (isNull(editorView)) {
        return;
      }

      editorView.update({
        ...editorView.props,
        dispatchTransaction(tr) {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          if (tr.docChanged) {
            onChange(getContent);
          }

          function getContent(): Nullable<EditorContent> {
            return mapForNullable(editorView, _ =>
              unwrapUnsafeValue<EditorContent>(_.state.doc.toJSON()),
            );
          }
        },
      });
    },
    [editorView, onChange],
  );
}

export const Editor: React.FunctionComponent<Props> = ({
  className,
  state,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(
    () => {
      if (isNull(editorRef.current)) {
        return;
      }

      const newEditorView = createEditorView(editorRef.current, state);
      setEditorView(newEditorView);

      return () => {
        newEditorView.destroy();
      };
    },
    [editorRef.current],
  );

  useEffect(
    () => {
      if (isNull(editorView)) {
        return;
      }

      editorView.updateState(state);
    },
    [editorView, state],
  );

  useEditorViewUpdate(editorView, onChange);

  return <ProseMirrorWrapper className={className} ref={editorRef} />;
};
