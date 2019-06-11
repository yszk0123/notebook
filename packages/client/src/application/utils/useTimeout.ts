import { useEffect, useRef } from 'react';
import { isNotNull, Nullable } from './Maybe';

type Callback = () => void;

export function useTimeout(callback: Callback, delay: number): void {
  const callbackRef = useRef<Nullable<Callback>>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function next() {
      if (isNotNull(callbackRef.current)) {
        callbackRef.current();
      }
    }

    const timeoutId = setTimeout(next, delay);
    return () => clearTimeout(timeoutId);
  }, [delay, callbackRef]);
}
