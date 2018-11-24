import { CounterAction, CounterState } from '../pages/counter/counter-type';
import { Dispatch } from '../redux';
import { RoutingAction, RoutingState } from '../routing/routing-type';

export type AppAction = CounterAction | RoutingAction;

export type AppDispatch = Dispatch<AppAction>;

export interface AppState {
  counter: CounterState;
  routing: RoutingState;
}

export interface AppContext {
  app: firebase.app.App;
  pathname: string;
  dispatch: AppDispatch;
}
