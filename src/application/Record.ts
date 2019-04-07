export function createRecord<Key extends string | number | symbol, T>(
  items: T[],
  getKey: (item: T) => Key,
): Record<Key, T> {
  const result: Record<Key, T> = {} as Record<Key, T>;

  items.forEach(item => {
    const key = getKey(item);
    result[key] = item;
  });

  return result;
}

export function updateRecord<Key extends string | number | symbol, T>(
  record: Record<Key, T>,
  items: T[],
  getKey: (item: T) => Key,
): Record<Key, T> {
  const result: Record<Key, T> = { ...record };

  items.forEach(item => {
    const key = getKey(item);
    result[key] = item;
  });

  return result;
}
