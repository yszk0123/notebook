import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { isNotUndefined } from 'option-t/lib/Undefinable';
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

interface Props {
  className?: string;
  state: EditorState;
  onChange: OnChange;
  onReady?: (editorView: EditorView) => void;
}

export const Editor: React.FunctionComponent<Props> = ({
  className,
  state,
  onChange,
  onReady,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEditorViewUpdate(editorView, onChange);

  useEffect(
    () => {
      if (isNull(editorView) || isNull(editorRef.current)) {
        return;
      }

      editorView.updateState(state);
    },
    [editorView, state],
  );

  useEffect(
    () => {
      if (isNull(editorRef.current)) {
        return;
      }

      if (isNotNull(editorView)) editorView.destroy();
      const newEditorView = createEditorView(editorRef.current, state);
      setEditorView(newEditorView);

      if (isNotUndefined(onReady)) {
        onReady(newEditorView);
      }

      return () => {
        if (isNotNull(editorView)) {
          editorView.destroy();
        }
      };
    },
    [editorRef.current],
  );

  return <ProseMirrorWrapper className={className} ref={editorRef} />;
};
