import { combineReducers, Reducer } from 'redux';
import { counterReducer } from '../pages/counter';
import { noteReducer } from '../pages/note';
import { routingReducer } from '../routing';
import { AppAction, AppState } from './app-type';

export const appReducer: Reducer<AppState, AppAction> = combineReducers<
  AppState
>({
  counter: counterReducer,
  note: noteReducer,
  routing: routingReducer,
});
