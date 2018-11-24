import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { printError } from '../../utils/printError';
import { Editor } from './components/Editor';
import './registerProseMirror';

function noop() {
  /* nothing */
}

export async function render() {
  const mountPoint = document.getElementById('root');

  ReactDOM.render(
    <>
      <Editor onChange={noop} content={null} />
      <ResetStyle />
    </>,
    mountPoint,
  );
}

render().catch(printError);
