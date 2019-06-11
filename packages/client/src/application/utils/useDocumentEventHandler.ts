import { useEffect } from 'react';

type EventHandler = (event: Event) => unknown;

export function useDocumentEventHandler(event: string, callback: EventHandler) {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, [callback]);
}
