import { combineReducers, Reducer } from 'redux';
import { counterReducer } from '../counter';
import { globalReducer } from '../global';
import { AppAction, AppState } from './app-type';

export const appReducer: Reducer<AppState, AppAction> = combineReducers<
  AppState
>({
  counter: counterReducer,
  global: globalReducer,
});
