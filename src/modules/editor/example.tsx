import { isNotNull, Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '../../components/ResetStyle';
import { ThemeProvider } from '../../styled-components';
import { defaultTheme } from '../../theme/theme';
import { printError } from '../../utils/printError';
import { Menu } from './components/Menu';
import { MenuItem } from './editor-type';
import { EditorContainer } from './EditorContainer';
import { createMenuItems } from './MenuItem';
import './registerProseMirror';
import { createSchema } from './Schema';

interface Props {
  schema: Schema;
  menuItems: MenuItem[];
}

const Example: React.FunctionComponent<Props> = ({ schema, menuItems }) => {
  const [editorView, setEditorView] = useState<Nullable<EditorView>>(null);

  return (
    <>
      <EditorContainer
        initialEditorContent={null}
        schema={schema}
        onReady={setEditorView}
      />
      {isNotNull(editorView) ? (
        <Menu menuItems={menuItems} editorView={editorView} />
      ) : null}
    </>
  );
};

export async function render() {
  const mountPoint = document.getElementById('root');
  const schema = createSchema();
  const menuItems = createMenuItems(schema);

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Example schema={schema} menuItems={menuItems} />
        <ResetStyle />
      </>
    </ThemeProvider>,
    mountPoint,
  );
}

render().catch(printError);
