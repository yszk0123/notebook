import { Dispatch } from '../../redux';
import { CounterAction, CounterState } from '../counter/counter-type';

export type AppAction = CounterAction;

export type AppDispatch = Dispatch<AppAction>;

export interface AppState {
  counter: CounterState;
}
