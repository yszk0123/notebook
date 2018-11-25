import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
import { EditorContainer } from './EditorContainer';
import './registerProseMirror';
import { createSchema } from './Schema';

export async function render() {
  const mountPoint = document.getElementById('root');
  const schema = createSchema();

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <EditorContainer initialEditorContent={null} schema={schema} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
