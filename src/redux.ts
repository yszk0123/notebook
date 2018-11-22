/**
 * @see https://qiita.com/terrierscript/items/b9687f610a96ab964ab2
 */
import { Action as ReduxAction, AnyAction } from 'redux';

export * from 'redux';

export type ActionCreators<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<T[keyof T]>;

export type Action<T extends string, Extra extends {} = {}> = ReduxAction<T> &
  { [K in keyof Extra]: Extra[K] };

type ExtraFunction<Args extends any[], R> = (...args: Args) => R;

type ActionCreator<Args extends any[], Action> = (...args: Args) => Action;

export function createAction<A extends string>(
  type: A,
): ActionCreator<any[], Action<A>>;

export function createAction<A extends string, Args extends any[], R>(
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
  Args extends any[] = []
> = Args extends []
  ? () => (dispatch: Dispatch<Action>, getState: () => State) => unknown
  : (
      ...args: Args
    ) => (dispatch: Dispatch<Action>, getState: () => State) => unknown;
