/**
 * The position of elements are oftern broken when showing virtual keyboard on iOS.
 * This helper will mitigate this behabior.
 *
 * @example
 * <input type="text" value={value} onFocus={stickToTop} />
 */
const VIRTUAL_KEYBOARD_ANIMATION_DURATION = 200;

export function stickToTop() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, VIRTUAL_KEYBOARD_ANIMATION_DURATION);
}
