import { unwrapOrElseFromUndefinable } from 'option-t/lib/Undefinable/unwrapOrElse';

export function restoreValueFromGlobalForDevelopment<T>(
  key: string,
  init: () => T,
): T {
  // tslint:disable-next-line:no-any
  const value = unwrapOrElseFromUndefinable((window as any)[key], init);
  // tslint:disable-next-line:no-any
  (window as any)[key] = value;
  return value;
}
