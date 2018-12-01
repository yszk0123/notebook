import { tapMaybe } from 'option-t/lib/Maybe/tap';
import { MarkdownSerializer } from 'prosemirror-markdown';
import { Schema } from 'prosemirror-model';

export const customMarkdownSerializer = new MarkdownSerializer<Schema>(
  {
    blockquote(state, node) {
      state.wrapBlock('> ', undefined, node, () => state.renderContent(node));
    },
    code_block(state, node) {
      state.write('```' + (node.attrs.params || '') + '\n');
      state.text(node.textContent, false);
      state.ensureNewLine();
      state.write('```');
      state.closeBlock(node);
    },
    heading(state, node) {
      state.write(state.repeat('#', node.attrs.level) + ' ');
      state.renderInline(node);
      state.closeBlock(node);
    },
    horizontal_rule(state, node) {
      state.write(node.attrs.markup || '---');
      state.closeBlock(node);
    },
    bullet_list(state, node) {
      state.renderList(node, '  ', () => (node.attrs.bullet || '*') + ' ');
    },
    ordered_list(state, node) {
      const start = node.attrs.order || 1;
      const maxW = String(start + node.childCount - 1).length;
      const space = state.repeat(' ', maxW + 2);
      state.renderList(node, space, i => {
        const nStr = String(start + i);
        return state.repeat(' ', maxW - nStr.length) + nStr + '. ';
      });
    },
    list_item(state, node) {
      state.renderContent(node);
    },
    todo(state, node) {
      const check = node.attrs.checked ? 'x' : ' ';
      state.write(`- [${check}] `);
      state.renderContent(node);
    },
    paragraph(state, node) {
      state.renderInline(node);
      state.closeBlock(node);
    },

    image(state, node) {
      state.write(
        '![' +
          state.esc(node.attrs.alt || '') +
          '](' +
          state.esc(node.attrs.src) +
          // @ts-ignore
          (node.attrs.title ? ' ' + state.quote(node.attrs.title) : '') +
          ')',
      );
    },
    hard_break(state, node, parent, index) {
      for (let i = index + 1; i < parent.childCount; i++) {
        if (parent.child(i).type !== node.type) {
          state.write('\\\n');
          return;
        }
      }
    },
    text(state, node) {
      tapMaybe(node.text, text => state.text(text));
    },
  },
  {
    code: { open: '`', close: '`', escape: false },
    em: {
      close: '*',
      expelEnclosingWhitespace: true,
      mixable: true,
      open: '*',
    },
    link: {
      open: '[',
      // tslint:disable-next-line:no-any
      close(state: any, mark: any) {
        return (
          '](' +
          state.esc(mark.attrs.href) +
          (mark.attrs.title ? ' ' + state.quote(mark.attrs.title) : '') +
          ')'
        );
      },
    },
    strong: {
      close: '**',
      expelEnclosingWhitespace: true,
      mixable: true,
      open: '**',
    },
  },
);
