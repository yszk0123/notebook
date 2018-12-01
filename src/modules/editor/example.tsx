import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
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
