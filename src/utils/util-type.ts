export type Diff<T, U> = T extends U ? never : T;

export type DiffProps<T, U> = Pick<T, Diff<keyof T, keyof U>>;

export type DiffKeys<T, U> = Pick<T, Diff<keyof T, U>>;
