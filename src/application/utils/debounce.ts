// tslint:disable-next-line:no-any
export function debounce<Args extends any[]>(fn: (...args: Args) => unknown, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...args: Args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
