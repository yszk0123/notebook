import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import React, { useCallback, useMemo, useState } from 'react';
import { Editor } from './components/Editor';
import { EditorContent } from './editor-type';
import { createStateFromContent } from './EditorState';

export interface Props {
  schema: Schema;
  initialEditorContent: Nullable<EditorContent>;
}

export const EditorContainer: React.FunctionComponent<Props> = ({
  schema,
  initialEditorContent = null,
}) => {
  const [editorContent, setEditorContent] = useState(initialEditorContent);

  const onChange = useCallback(
    (getContent: () => Nullable<EditorContent>) => {
      const content = getContent();
      setEditorContent(content);
    },
    [schema],
  );

  const editorState = useMemo(
    () => createStateFromContent(schema, initialEditorContent),
    [initialEditorContent],
  );

  return <Editor onChange={onChange} state={editorState} />;
};
