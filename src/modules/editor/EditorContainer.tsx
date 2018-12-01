import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import React, { useMemo, useRef, useState } from 'react';
import { styled } from '../../styled-components';
import { useDebouncedCallback } from '../../utils/useDebouncedCallback';
import { Editor } from './components/Editor';
import { EditorMenu } from './components/EditorMenu';
import { EditorContent, MenuItem } from './editor-type';
import { createStateFromContent } from './EditorState';
import { customMarkdownSerializer } from './MarkdownPlugin/MarkdownSerializer';

const StyledMenu = styled(EditorMenu)`
  display: flex;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSize.large};
  overflow-x: auto;
  padding: ${({ theme }) => theme.thinkSpace}px;
  width: 100%;
`;

const StyledEditor = styled.div`
  border: 2px solid #ccc;

  .ProseMirror {
    font-size: ${({ theme }) => theme.fontSize.default};
  }
`;

export interface Props {
  schema: Schema;
  menuItems: MenuItem[];
}

export const EditorContainer: React.FunctionComponent<Props> = ({
  schema,
  menuItems,
}) => {
  const initialEditorContent = null;
  const editorContentRef = useRef<Nullable<EditorContent>>(
    initialEditorContent,
  );
  const [markdown, setMarkdown] = useState('');

  const onChange = useDebouncedCallback(
    (getContent: () => Nullable<EditorContent>) => {
      editorContentRef.current = getContent();
      const state = createStateFromContent(schema, editorContentRef.current);
      setMarkdown(customMarkdownSerializer.serialize(state.doc));
    },
    300,
    [schema],
  );

  const editorState = useMemo(
    () => createStateFromContent(schema, initialEditorContent),
    [initialEditorContent],
  );

  return (
    <Editor onChange={onChange} state={editorState}>
      {({ editor, editorView }) => {
        return (
          <>
            <StyledEditor>{editor}</StyledEditor>
            <StyledMenu menuItems={menuItems} editorView={editorView} />
            <pre>{markdown}</pre>
          </>
        );
      }}
    </Editor>
  );
};
