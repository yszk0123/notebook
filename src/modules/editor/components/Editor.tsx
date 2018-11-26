import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { tapNullable } from 'option-t/lib/Nullable/tap';
import { tapUndefinable } from 'option-t/lib/Undefinable/tap';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<Nullable<EditorView>>(null);

  useEditorViewUpdate(editorViewRef.current, onChange);

  useEffect(
    () => {
      tapNullable(editorViewRef.current, _ => _.updateState(state));
    },
    [editorViewRef.current, state],
  );

  useEffect(
    () => {
      if (isNull(ref.current)) {
        return;
      }

      tapNullable(editorViewRef.current, _ => _.destroy());

      const oldEditorView = editorViewRef.current;
      const newEditorView = createEditorView(ref.current, state);
      editorViewRef.current = newEditorView;

      tapUndefinable(onReady, _ => _(newEditorView));

      return () => {
        tapNullable(oldEditorView, _ => _.destroy());
      };
    },
    [ref.current],
  );

  return <ProseMirrorWrapper className={className} ref={ref} />;
};
