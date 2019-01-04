/**
 * @see https://qiita.com/terrierscript/items/b9687f610a96ab964ab2
 */
import { Action as ReduxAction, AnyAction } from 'redux';

export * from 'redux';

// tslint:disable-next-line:no-any
type AnyForExtend = any;

export type GetAction<
  T extends { [key: string]: (...args: Array<AnyForExtend>) => AnyForExtend }
> = ReturnType<T[keyof T]>;

export type Action<T extends string, Extra extends {} = {}> = ReduxAction<T> &
  { [K in keyof Extra]: Extra[K] };

type ExtraFunction<Args extends Array<AnyForExtend>, R> = (...args: Args) => R;

type ActionCreator<Args, TAction> = Args extends Array<AnyForExtend>
  ? (...args: Args) => TAction
  : () => TAction;

export function createAction<A extends string>(
  type: A,
): ActionCreator<void, Action<A>>;

export function createAction<
  A extends string,
  Args extends Array<AnyForExtend>,
  R
>(type: A, fn: ExtraFunction<Args, R>): ActionCreator<Args, Action<A, R>>;

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

export type Dispatch<TAction> = ((
  // tslint:disable-next-line:no-any
  action: TAction | ((...args: Array<any>) => unknown),
) => unknown);

export type EffectCreator<
  State,
  TAction extends AnyAction,
  Args = void
> = Args extends Array<AnyForExtend>
  ? (
      ...args: Args
    ) => (
      dispatch: Dispatch<TAction>,
      getState: () => State,
    ) => Promise<unknown>
  : () => (
      dispatch: Dispatch<TAction>,
      getState: () => State,
    ) => Promise<unknown>;
