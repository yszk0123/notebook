import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { Schema } from 'prosemirror-model';
import { wrapInList } from 'prosemirror-schema-list';
import { MenuItem } from './editor-type';
import { toggleCheckbox } from './TodoPlugin/TodoCommand';

export function createMenuItems(schema: Schema) {
  const items: MenuItem[] = [
    {
      command: setBlockType(schema.nodes.text, { level: 1 }),
      longTitle: 'plain',
      shortTitle: 'Plain',
    },
    {
      command: toggleMark(schema.marks.strong),
      longTitle: 'strong',
      shortTitle: 'Bold',
    },
    {
      command: toggleMark(schema.marks.strong),
      longTitle: 'em',
      shortTitle: 'italic',
    },
    {
      command: setBlockType(schema.marks.strong),
      longTitle: 'paragraph',
      shortTitle: 'Para',
    },
    {
      command: setBlockType(schema.nodes.heading, { level: 1 }),
      longTitle: 'heading',
      shortTitle: 'H1',
    },
    {
      command: setBlockType(schema.nodes.heading, { level: 2 }),
      longTitle: 'heading',
      shortTitle: 'H2',
    },
    {
      command: setBlockType(schema.nodes.heading, { level: 3 }),
      longTitle: 'heading',
      shortTitle: 'H3',
    },
    {
      command: wrapIn(schema.nodes.blockquote),
      longTitle: 'blockquote',
      shortTitle: '>',
    },
    {
      command: wrapInList(schema.nodes.bullet_list),
      longTitle: 'bullet list',
      shortTitle: '-',
    },
    {
      command: wrapInList(schema.nodes.ordered_list),
      longTitle: 'bullet list',
      shortTitle: '1.',
    },
    {
      command: toggleCheckbox,
      longTitle: 'toggle checkbox',
      shortTitle: 'T',
    },
  ];

  return items;
}
