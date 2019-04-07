import { useEffect } from 'react';

type EventHandler = (event: Event) => unknown;

export function useWindowEventHandler(event: string, callback: EventHandler) {
  useEffect(() => {
    window.addEventListener(event, callback);

    return () => {
      window.removeEventListener(event, callback);
    };
  }, [callback]);
}
