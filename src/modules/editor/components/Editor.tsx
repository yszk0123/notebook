import { EditorView } from 'prosemirror-view';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '../../../styled-components';
import { createEditorView } from '../createEditorView';

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
  onPersistData(data: any): void;
}

export const Editor: React.FunctionComponent<Props> = ({ onPersistData }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  const onClick = () => {
    if (!view) {
      return;
    }

    const data = view.state.doc.toJSON();
    onPersistData(data);
  };

  useEffect(() => {
    if (!editorRef.current || !contentRef.current) {
      return;
    }

    const newView = createEditorView(editorRef.current, contentRef.current);
    setView(newView);

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <>
      <ProseMirrorWrapper ref={editorRef} />
      <div ref={contentRef} style={{ display: 'none' }} />
      <button onClick={onClick}>Save</button>
    </>
  );
};
