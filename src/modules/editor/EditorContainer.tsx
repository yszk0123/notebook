import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useState } from 'react';
import { Editor } from './components/Editor';
import { EditorContent } from './editor-type';
import { createStateFromContent } from './EditorState';

export interface Props {
  schema: Schema;
  initialState: EditorState;
}

export const EditorContainer: React.FunctionComponent<Props> = ({
  schema,
  initialState,
}) => {
  const [state, setState] = useState(initialState);

  const onChange = useCallback(
    (getContent: () => Nullable<EditorContent>) => {
      setState(createStateFromContent(schema, getContent()));
    },
    [schema],
  );

  return <Editor onChange={onChange} state={state} />;
};
