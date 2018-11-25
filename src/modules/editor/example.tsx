import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
import { EditorContainer } from './EditorContainer';
import { createStateFromJSON } from './EditorState';
import './registerProseMirror';
import { createSchema } from './Schema';

export async function render() {
  const mountPoint = document.getElementById('root');
  const schema = createSchema();
  const initialState = createStateFromJSON(schema, null);

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <EditorContainer initialState={initialState} schema={schema} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
