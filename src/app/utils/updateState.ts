import updateState from 'immutability-helper';

export { updateState };

export function pushDistinctModel<T extends { id: string }>(newItem: T): (items: T[]) => T[] {
  return items => {
    return [...items.filter(item => item.id !== newItem.id), newItem];
  };
}

export function pushDistinct<T>(newItem: T): (items: T[]) => T[] {
  return items => {
    return [...items.filter(item => item !== newItem), newItem];
  };
}
