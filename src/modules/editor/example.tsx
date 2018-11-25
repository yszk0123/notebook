import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
import { Editor } from './components/Editor';
import './registerProseMirror';
import { createSchema } from './Schema';

function noop() {
  /* nothing */
}

export async function render() {
  const mountPoint = document.getElementById('root');
  const schema = createSchema();

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Editor schema={schema} onChange={noop} content={null} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
