import { CounterAction, CounterState } from '../pages/counter/counter-type';
import { Dispatch } from '../redux';
import { GlobalAction, GlobalState } from '../routing/routing-type';

export type AppAction = CounterAction | GlobalAction;

export type AppDispatch = Dispatch<AppAction>;

export interface AppState {
  counter: CounterState;
  global: GlobalState;
}

export interface AppContext {
  app: firebase.app.App;
  pathname: string;
  dispatch: AppDispatch;
}
