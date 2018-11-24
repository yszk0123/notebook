import { combineReducers, Reducer } from 'redux';
import { counterReducer } from '../pages/counter';
import { globalReducer } from '../routing';
import { AppAction, AppState } from './app-type';

export const appReducer: Reducer<AppState, AppAction> = combineReducers<
  AppState
>({
  counter: counterReducer,
  global: globalReducer,
});
