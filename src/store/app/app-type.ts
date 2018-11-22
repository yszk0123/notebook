import { Dispatch } from '../../redux';
import { CounterAction, CounterState } from '../counter/counter-type';
import { GlobalAction, GlobalState } from '../global/global-type';

export type AppAction = CounterAction | GlobalAction;

export type AppDispatch = Dispatch<AppAction>;

export interface AppState {
  counter: CounterState;
  global: GlobalState;
}
