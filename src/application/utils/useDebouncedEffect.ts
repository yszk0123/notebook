import { MutableRefObject, useEffect, useRef } from 'react';
import { Nullable } from './Maybe';

// tslint:disable-next-line:no-any
export function useDebouncedEffect<Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number,
  // tslint:disable-next-line:no-any
  inputs: ReadonlyArray<any>,
) {
  const timerRef: MutableRefObject<Nullable<NodeJS.Timeout>> = useRef(null);

  useEffect(
    (...args: Args) => {
      clear();

      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);

      return clear;
    },
    [...inputs, delay],
  );

  function clear() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }
}
