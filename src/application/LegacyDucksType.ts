import { AnyAction } from 'redux';
import { AnyForExtend, Dispatch } from './DucksType';
export type LegacyDucksType = any;
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
