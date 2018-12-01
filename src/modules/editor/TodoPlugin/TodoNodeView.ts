import { Node } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';

function createTodo({ className }: { className: string }) {
  const li = document.createElement('li');
  li.className = className;
  li.style.listStyleType = 'none';
  return li;
}

function createCheckbox({ checked }: { checked: boolean }) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  return input;
}

function createInlineBlock() {
  const span = document.createElement('span');
  span.style.display = 'inline-block';
  return span;
}

export class TodoNodeView implements NodeView {
  public contentDOM: HTMLElement;
  public dom: HTMLElement;

  constructor(node: Node) {
    const todo = createTodo({ className: 'todo' });
    const checkbox = createCheckbox({ checked: node.attrs.checked });
    const inlineBlock = createInlineBlock();
    todo.appendChild(checkbox);
    todo.appendChild(inlineBlock);

    this.contentDOM = inlineBlock;
    this.dom = todo;
  }
}
