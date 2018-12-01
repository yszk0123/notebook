import { Nullable } from 'option-t/lib/Nullable';
import { mapOrElseForNullable } from 'option-t/lib/Nullable/mapOrElse';
import { Node, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { buildPlugins } from './DefaultPlugin';
import { EditorContent } from './editor-type';

function createEmptyDoc(schema: Schema): Node {
  return schema.node('doc', {}, [
    schema.node('paragraph', {}, []),
    schema.node('todo', { checked: false }, [
      schema.node('paragraph', {}, [schema.text('a')]),
    ]),
  ]);
}

export function createStateFromContent(
  schema: Schema,
  content: Nullable<EditorContent>,
) {
  const doc = mapOrElseForNullable(
    content,
    () => createEmptyDoc(schema),
    schema.nodeFromJSON,
  );

  return EditorState.create({
    doc,
    plugins: buildPlugins(schema),
  });
}
