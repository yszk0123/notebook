import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import { EditorView } from 'prosemirror-view';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '../../../styled-components';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { createEditorView, createStateFromJSON } from '../createEditorView';
import { NodeAsJSON } from '../editor-type';

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

interface Props {
  className?: string;
  content: Nullable<NodeAsJSON>;
  onPersistData(data: NodeAsJSON): void;
}

export const Editor: React.FunctionComponent<Props> = ({
  className,
  content,
  onPersistData,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  const onClick = useCallback(
    () => {
      if (!view) {
        return;
      }

      const data = unwrapUnsafeValue<NodeAsJSON>(view.state.doc.toJSON());
      onPersistData(data);
    },
    [view],
  );

  useEffect(() => {
    if (isNull(editorRef.current) || isNull(contentRef.current)) {
      return;
    }

    const newView = createEditorView(editorRef.current, content);
    setView(newView);

    return () => {
      if (isNotNull(view)) {
        view.destroy();
      }
    };
  }, []);

  useEffect(
    () => {
      if (isNull(view) || isNull(content)) {
        return;
      }

      view.updateState(createStateFromJSON(content));
    },
    [content],
  );

  return (
    <>
      <ProseMirrorWrapper className={className} ref={editorRef} />
      <div ref={contentRef} style={{ display: 'none' }} />
      <button onClick={onClick}>Save</button>
    </>
  );
};
