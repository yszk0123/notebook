import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { Editor } from './components/Editor';
import './registerProseMirror';

function noop() {}

export async function render() {
  const mountPoint = document.getElementById('root');

  ReactDOM.render(
    <>
      <Editor onPersistData={noop} />
      <ResetStyle />
    </>,
    mountPoint,
  );
}

render().catch(console.error);
