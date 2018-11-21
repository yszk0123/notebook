import { History } from 'history';

export function getCurrentPath(history: History): string {
  return history.createHref(history.location).replace(location.origin, '');
}
