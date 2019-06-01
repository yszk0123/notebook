import { Nullable } from 'option-t/lib/Nullable';
import { MutableRefObject, useEffect, useRef } from 'react';

// tslint:disable-next-line:no-any
export function useDebouncedEffect<Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number,
  // tslint:disable-next-line:no-any
  inputs: ReadonlyArray<any>,
) {
  const timerRef: MutableRefObject<Nullable<number>> = useRef(null);

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
