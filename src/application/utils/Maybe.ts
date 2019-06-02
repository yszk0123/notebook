export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type NullOrUndefined = null | undefined;

export function isNull<T>(value: Nullable<T>): value is null {
  return value === null;
}

export function isNotNull<T>(value: Nullable<T>): value is T {
  return value !== null;
}

export function isUndefined<T>(value: Undefinable<T>): value is undefined {
  return value === undefined;
}

export function isNotUndefined<T>(value: Undefinable<T>): value is T {
  return value !== undefined;
}

export function isNullOrUndefined<T>(value: Maybe<T>): value is NullOrUndefined {
  return value == null;
}

export function isNotNullAndUndefined<T>(value: Maybe<T>): value is T {
  return value != null;
}
