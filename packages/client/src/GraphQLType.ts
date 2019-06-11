export * from './__generated__/GraphQLOperations';

type Compact<A> = { [K in keyof A]: A[K] };
type _GetProp<A> = Compact<NonNullable<A>>;
export type GetProp<A, P1, P2 = void, P3 = void> = P1 extends keyof A
  ? P2 extends keyof A[P1]
    ? P3 extends keyof A[P1][P2]
      ? _GetProp<A[P1][P2][P3]>
      : _GetProp<A[P1][P2]>
    : _GetProp<A[P1]>
  : never;
