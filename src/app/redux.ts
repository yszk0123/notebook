/**
 * @see https://qiita.com/terrierscript/items/b9687f610a96ab964ab2
 */
import { Action as ReduxAction, AnyAction } from 'redux';

export * from 'redux';

// tslint:disable-next-line:no-any
type AnyForExtend = any;

export type GetAction<
  T extends { [key: string]: (...args: AnyForExtend[]) => AnyForExtend }
> = ReturnType<T[keyof T]>;

export type Action<T extends string, Extra extends {} = {}> = ReduxAction<T> &
  { [K in keyof Extra]: Extra[K] };

export type ActionCreator<Type extends string, TPayload = void> = TPayload extends void
  ? () => { type: Type; payload?: TPayload }
  : (payload: TPayload) => Action<Type, { payload: TPayload }>;

export function action<Type extends string, Payload = void>(
  type: Type,
): ActionCreator<Type, Payload> {
  return (payload => ({ payload, type })) as ActionCreator<Type, Payload>;
}

export type Dispatch<TAction> = (
  // tslint:disable-next-line:no-any
  action: TAction | ((...args: any[]) => unknown),
) => unknown;

/**
 * Alias for async action creator
 */
export type SideEffect<
  State,
  TAction extends AnyAction,
  Args = void,
  Context = unknown
> = Args extends AnyForExtend[]
  ? (...args: Args) => (dispatch: Dispatch<TAction>, getState: () => State, context: Context) => any
  : Args extends void
  ? () => (dispatch: Dispatch<TAction>, getState: () => State, context: Context) => any
  : (arg: Args) => (dispatch: Dispatch<TAction>, getState: () => State, context: Context) => any;
