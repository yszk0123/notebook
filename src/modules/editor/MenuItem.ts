import {
  selectParentNode,
  setBlockType,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands';
import { NodeType, Schema } from 'prosemirror-model';
import { wrapInList } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { Command, MenuItem } from './EditorType';
import { toggleCheckbox } from './TodoPlugin/TodoCommand';

function alwaysTrue(): true {
  return true;
}

export function setBlockTypeMenu<
  Options extends { longTitle: string; shortTitle: string }
>(nodeType: NodeType, { longTitle, shortTitle, ...attrs }: Options): MenuItem {
  const command = setBlockType(nodeType, attrs);

  return {
    active(state: EditorState) {
      const { $from, to } = state.selection;
      return to <= $from.end() && $from.parent.hasMarkup(nodeType);
    },
    enable(state: EditorState) {
      return command(state);
    },
    longTitle,
    run: command,
    shortTitle,
  };
}

interface MenuItemParam {
  longTitle: string;
  run: Command;
  shortTitle: string;
  active?(state: EditorState): boolean;
  enable?(state: EditorState): boolean;
}

function createItem({
  longTitle,
  run,
  shortTitle,
  active = alwaysTrue,
  enable = alwaysTrue,
}: MenuItemParam): MenuItem {
  return {
    active,
    enable,
    longTitle,
    run,
    shortTitle,
  };
}

export function createMenuItems(schema: Schema) {
  const items: MenuItem[] = [
    setBlockTypeMenu(schema.nodes.text, {
      level: 1,
      longTitle: 'plain',
      shortTitle: 'Plain',
    }),
    // {
    //   longTitle: 'paragraph',
    //   run: setBlockType(schema.marks.strong),
    //   shortTitle: 'Para',
    // },
    {
      longTitle: 'blockquote',
      run: wrapIn(schema.nodes.blockquote),
      shortTitle: '>',
    },
    {
      longTitle: 'bullet list',
      run: wrapInList(schema.nodes.bullet_list),
      shortTitle: '-',
    },
    {
      longTitle: 'bullet list',
      run: wrapInList(schema.nodes.ordered_list),
      shortTitle: '1.',
    },
    {
      longTitle: 'todo list',
      run: wrapIn(schema.nodes.todo),
      shortTitle: '☑',
    },
    {
      longTitle: 'toggle checkbox',
      run: toggleCheckbox,
      shortTitle: '✔',
    },
    {
      longTitle: 'heading',
      run: setBlockType(schema.nodes.heading, { level: 1 }),
      shortTitle: 'H1',
    },
    {
      longTitle: 'heading',
      run: setBlockType(schema.nodes.heading, { level: 2 }),
      shortTitle: 'H2',
    },
    {
      longTitle: 'heading',
      run: setBlockType(schema.nodes.heading, { level: 3 }),
      shortTitle: 'H3',
    },
    {
      longTitle: 'select parent',
      run: selectParentNode,
      shortTitle: '□',
    },
    {
      longTitle: 'strong',
      run: toggleMark(schema.marks.strong),
      shortTitle: 'Bold',
    },
    {
      longTitle: 'em',
      run: toggleMark(schema.marks.strong),
      shortTitle: 'italic',
    },
  ].map(createItem);

  return items;
}
