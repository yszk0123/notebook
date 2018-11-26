import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import React, { useCallback, useMemo, useRef } from 'react';
import { Editor } from './components/Editor';
import { EditorContent } from './editor-type';
import { createStateFromContent } from './EditorState';

export interface Props {
  initialEditorContent: Nullable<EditorContent>;
  onReady?: (editorView: EditorView) => void;
  schema: Schema;
}

export const EditorContainer: React.FunctionComponent<Props> = ({
  initialEditorContent = null,
  onReady,
  schema,
}) => {
  const editorContentRef = useRef(initialEditorContent);

  const onChange = useCallback(
    (getContent: () => Nullable<EditorContent>) => {
      editorContentRef.current = getContent();
    },
    [schema],
  );

  const editorState = useMemo(
    () => createStateFromContent(schema, initialEditorContent),
    [initialEditorContent],
  );

  return <Editor onChange={onChange} onReady={onReady} state={editorState} />;
};
