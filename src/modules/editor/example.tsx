import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
import { Editor } from './components/Editor';
import './registerProseMirror';

function noop() {
  /* nothing */
}

export async function render() {
  const mountPoint = document.getElementById('root');

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Editor onChange={noop} content={null} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
