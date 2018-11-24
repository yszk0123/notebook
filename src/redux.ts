/**
 * @see https://qiita.com/terrierscript/items/b9687f610a96ab964ab2
 */
import { Action as ReduxAction, AnyAction } from 'redux';

export * from 'redux';

type AnyForExtend = any;

export type GetAction<
  T extends { [key: string]: (...args: AnyForExtend[]) => AnyForExtend }
> = ReturnType<T[keyof T]>;

export type Action<T extends string, Extra extends {} = {}> = ReduxAction<T> &
  { [K in keyof Extra]: Extra[K] };

type ExtraFunction<Args extends AnyForExtend[], R> = (...args: Args) => R;

type ActionCreator<Args, Action> = Args extends AnyForExtend[]
  ? (...args: Args) => Action
  : () => Action;

export function createAction<A extends string>(
  type: A,
): ActionCreator<void, Action<A>>;

export function createAction<A extends string, Args extends AnyForExtend[], R>(
  type: A,
  fn: ExtraFunction<Args, R>,
): ActionCreator<Args, Action<A, R>>;

// @ts-ignore
export function createAction(type, extraFunction?) {
  // @ts-ignore
  return (...args) => {
    if (extraFunction) {
      const extra = extraFunction(...args);
      return { type, ...extra };
    }
    return { type };
  };
}

export type Dispatch<Action extends AnyAction> = ((...args: any[]) => unknown);

export type EffectCreator<
  State,
  Action extends AnyAction,
  Args = void
> = Args extends AnyForExtend[]
  ? (
      ...args: Args
    ) => (dispatch: Dispatch<Action>, getState: () => State) => unknown
  : () => (dispatch: Dispatch<Action>, getState: () => State) => unknown;
