import { useMemo } from 'react';

// tslint:disable-next-line:no-any
export function useDebouncedCallback<Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number,
  // tslint:disable-next-line:no-any
  inputs: ReadonlyArray<any>,
) {
  return useMemo(
    () => {
      let timeoutId: NodeJS.Timeout;

      return (...args: Args) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    },
    [...inputs, delay],
  );
}
