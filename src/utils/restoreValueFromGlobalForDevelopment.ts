import { unwrapOrElseFromUndefinable } from 'option-t/lib/Undefinable/unwrapOrElse';

export function restoreValueFromGlobalForDevelopment<T>(
  key: string,
  init: () => T,
): T {
  const value = unwrapOrElseFromUndefinable((window as any)[key], init);
  (window as any)[key] = value;
  return value;
}
