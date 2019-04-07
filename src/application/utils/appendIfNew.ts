export function appendIfNew<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values : [...values, value];
}
