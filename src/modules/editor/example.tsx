import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../../application/styled-components';
import { defaultTheme } from '../../application/theme/DefaultTheme';
import { printError } from '../../application/utils/printError';
import { ResetStyle } from '../../components/ResetStyle';
import { createSchema } from './DefaultPlugin';
import { EditorContainer } from './EditorContainer';
import { createMenuItems } from './MenuItem';
import './registerProseMirror';

export async function render() {
  const mountPoint = document.getElementById('root');
  const schema = createSchema();
  const menuItems = createMenuItems(schema);

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <EditorContainer schema={schema} menuItems={menuItems} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
