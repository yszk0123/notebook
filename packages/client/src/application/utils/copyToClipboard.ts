import { isNull, Nullable } from './Maybe';

export function copyToClipboard(text: string) {
  const element = document.createElement('pre');
  element.textContent = text;

  const style = element.style;
  style.position = 'fixed';
  style.left = '-100%';

  document.body.appendChild(element);
  const selection: Nullable<Selection> = document.getSelection();
  if (isNull(selection)) {
    return;
  }

  selection.selectAllChildren(element);

  // Note: document.executeCommand returns
  // true = success, false = faillure
  document.execCommand('copy');

  document.body.removeChild(element);
}
