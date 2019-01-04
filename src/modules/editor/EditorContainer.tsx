import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useRef, useState } from 'react';
import { styled } from '../../styled-components';
import { useDebouncedCallback } from '../../utils/useDebouncedCallback';
import { EditorMenu } from './components/EditorMenu';
import { EditorContent, MenuItem } from './editor-type';
import { createStateFromContent, serializeEditorState } from './EditorState';
import { editorStyle } from './editorStyle';
import { customMarkdownSerializer } from './MarkdownPlugin/MarkdownSerializer';
import { useEditor } from './useEditor';

const EditorContainerLayout = styled.div``;

const Editor = styled.div`
  border: 2px solid #ccc;

  .ProseMirror {
    font-size: ${({ theme }) => theme.fontSize.default};
  }

  ${editorStyle}
`;

export interface Props {
  schema: Schema;
  menuItems: Array<MenuItem>;
}

export const EditorContainer: React.FunctionComponent<Props> = ({
  schema,
  menuItems,
}) => {
  const initialEditorContent = null;
  const editorContentRef = useRef<Nullable<EditorContent>>(
    initialEditorContent,
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const [markdown, setMarkdown] = useState('');

  const [editorState, setEditorState] = useState(() =>
    createStateFromContent(schema, initialEditorContent),
  );

  const onPersistState = useDebouncedCallback(
    (nextState: EditorState) => {
      editorContentRef.current = serializeEditorState(nextState);
      setMarkdown(customMarkdownSerializer.serialize(nextState.doc));
    },
    300,
    [],
  );

  const onChange = useCallback(
    (nextState: EditorState, _prevState: EditorState, docChanged: boolean) => {
      if (docChanged) {
        onPersistState(nextState);
      }
      setEditorState(nextState);
    },
    [],
  );

  const editorView = useEditor({
    editorRef,
    editorState,
    onChange,
  });

  return (
    <EditorContainerLayout>
      <Editor ref={editorRef} />
      <EditorMenu
        menuItems={menuItems}
        editorState={editorState}
        editorView={editorView}
      />
      <pre>{markdown}</pre>
    </EditorContainerLayout>
  );
};
