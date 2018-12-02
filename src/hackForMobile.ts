/**
 * @see https://coliss.com/articles/build-websites/operation/css/viewport-units-on-mobile.html
 * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
import { debounce } from './utils/debounce';

const INTERVAL = 1000;

function updateVh() {
  const vh = window.innerHeight / 100;
  document.documentElement.style.setProperty('--hack-vh', `${vh}px`);
}

export function hackForMobile() {
  updateVh();
  window.addEventListener('resize', debounce(updateVh, INTERVAL));
}
