import { Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useState } from 'react';
import { Editor } from './components/Editor';
import { NodeAsJSON } from './editor-type';
import { createStateFromJSON } from './EditorState';

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
    (getContent: () => Nullable<NodeAsJSON>) => {
      setState(createStateFromJSON(schema, getContent()));
    },
    [schema],
  );

  return <Editor onChange={onChange} state={state} />;
};
