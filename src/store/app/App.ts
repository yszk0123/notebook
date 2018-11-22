import { combineReducers, Reducer } from 'redux';
import { Dispatch } from '../../redux';
import { CounterAction, counterReducer } from '../counter/Counter';
import { AppState } from './AppType';

export type AppAction = CounterAction;

export type AppDispatch = Dispatch<AppAction>;

export const appReducer: Reducer<AppState, AppAction> = combineReducers<
  AppState
>({
  counter: counterReducer,
});
