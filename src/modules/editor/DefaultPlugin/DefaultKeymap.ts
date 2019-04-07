/**
 * @see https://github.com/ProseMirror/prosemirror-example-setup/blob/afbc42a68803a57af3f29dd93c3c522c30ea3ed6/src/keymap.js
 */
import { Nullable } from 'option-t/lib/Nullable';
import { isNotUndefined, isUndefined } from 'option-t/lib/Undefinable';
import { tapUndefinable } from 'option-t/lib/Undefinable/tap';
import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import {
  chainCommands,
  exitCode,
  joinDown,
  joinUp,
  lift,
  selectParentNode,
  setBlockType,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { MarkType, NodeType, Schema } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import { Command } from '../EditorType';

const mac = isUndefined(navigator) ? /Mac/.test(navigator.platform) : false;

export function buildKeymap(
  schema: Schema,
  mapKeys: Record<string, string | false> = {},
): Record<string, Nullable<Command>> {
  const keys: Record<string, Nullable<Command>> = {};

  function bind(key: string, cmd: Command) {
    const mappedKey = mapKeys[key];
    if (mappedKey === false) {
      return;
    }

    const finalKey = unwrapOrFromUndefinable(mappedKey, key);
    keys[finalKey] = cmd;
  }

  bind('Mod-z', undo);
  bind('Shift-Mod-z', redo);
  bind('Backspace', undoInputRule);
  if (!mac) {
    bind('Mod-y', redo);
  }

  bind('Alt-ArrowUp', joinUp);
  bind('Alt-ArrowDown', joinDown);
  bind('Mod-BracketLeft', lift);
  bind('Escape', selectParentNode);

  tapUndefinable<MarkType>(schema.marks.strong, type => {
    bind('Mod-b', toggleMark(type));
  });
  tapUndefinable<MarkType>(schema.marks.em, type => {
    bind('Mod-i', toggleMark(type));
  });
  tapUndefinable<MarkType>(schema.marks.code, type => {
    bind('Mod-`', toggleMark(type));
  });

  tapUndefinable<NodeType>(schema.nodes.bullet_list, type => {
    bind('Shift-Ctrl-8', wrapInList(type));
  });
  tapUndefinable<NodeType>(schema.nodes.ordered_list, type => {
    bind('Shift-Ctrl-9', wrapInList(type));
  });
  tapUndefinable<NodeType>(schema.nodes.blockquote, type => {
    bind('Ctrl->', wrapIn(type));
  });
  tapUndefinable<NodeType>(schema.nodes.hard_break, type => {
    const br = type;
    const cmd = chainCommands(exitCode, (state, dispatch) => {
      if (isNotUndefined(dispatch)) {
        dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
      }
      return true;
    });
    bind('Mod-Enter', cmd);
    bind('Shift-Enter', cmd);
    if (mac) {
      bind('Ctrl-Enter', cmd);
    }
  });
  tapUndefinable<NodeType>(schema.nodes.list_item, type => {
    bind('Enter', splitListItem(type));
    bind('Shift-Tab', liftListItem(type));
    bind('Tab', sinkListItem(type));
  });
  tapUndefinable<NodeType>(schema.nodes.todo, type => {
    bind('Enter', splitListItem(type));
    bind('Shift-Tab', liftListItem(type));
    bind('Tab', sinkListItem(type));
  });
  tapUndefinable<NodeType>(schema.nodes.paragraph, type => {
    bind('Shift-Ctrl-0', setBlockType(type));
  });
  tapUndefinable<NodeType>(schema.nodes.code_block, type => {
    bind('Shift-Ctrl-\\', setBlockType(type));
  });
  tapUndefinable<NodeType>(schema.nodes.heading, type => {
    for (let i = 1; i <= 6; i++) {
      bind('Shift-Ctrl-' + i, setBlockType(type, { level: i }));
    }
  });
  tapUndefinable<NodeType>(schema.nodes.horizontal_rule, type => {
    const hr = type;
    bind('Mod-_', (state, dispatch) => {
      if (isNotUndefined(dispatch)) {
        dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
      }
      return true;
    });
  });

  return keys;
}
