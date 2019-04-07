/**
 * @see https://qiita.com/terrierscript/items/b9687f610a96ab964ab2
 */
import { Undefinable } from 'option-t/lib/Undefinable';
import { Action as ReduxAction, AnyAction } from 'redux';
import { AppInjections } from './ApplicationType';

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

export type Reducer<State, TAction extends Action<any, any>> = (
  state: State,
  action: TAction,
) => State;

export type ReducerWithInitialState<State, TAction extends Action<any, any>> = (
  state: Undefinable<State>,
  action: TAction,
) => State;

type ReducerHandler<TState, TType extends string, TAction extends { type: TType }> = {
  [Type in TType]: TAction extends { type: Type } ? Reducer<TState, TAction> : never
};
export function createReducer<TState, TType extends string, TAction extends { type: TType }>(
  handler: ReducerHandler<TState, TType, TAction>,
  initialState: TState,
  defaultReducer: ReducerWithInitialState<TState, TAction> = (
    state: Undefinable<TState> = initialState,
  ) => state,
): ReducerWithInitialState<TState, TAction> {
  const reducer: ReducerWithInitialState<TState, TAction> = (state = initialState, a) => {
    const h = handler[a.type] || defaultReducer;
    return h(state, a);
  };
  return reducer;
}

export type ThunkAction<State, DispatchableAction> = (
  dispatch: Dispatch<DispatchableAction>,
  getState: () => State,
  injections: AppInjections,
) => Promise<unknown>;

export type Dispatch<DispatchableAction = Action<any, any> | ThunkAction<any, any>> = (
  arg: Arg<DispatchableAction>,
) => any;
type Arg<DispatchableAction> = DispatchableAction extends Thunk<any, any, any>
  ? ReturnType<DispatchableAction>
  : DispatchableAction;

export type Thunk<State, Payload, DispatchableAction> = Payload extends void
  ? () => ThunkAction<State, DispatchableAction>
  : (payload: Payload) => ThunkAction<State, DispatchableAction>;

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
