import { combineReducers, Reducer } from 'redux';
import { AppAction, AppState } from './app/app-type';
import { counterReducer } from './pages/counter';
import { noteReducer } from './pages/note';
import { wordReducer } from './pages/word';
import { routingReducer } from './routing';

export const appReducer: Reducer<AppState, AppAction> = combineReducers<
  AppState
>({
  counter: counterReducer,
  note: noteReducer,
  routing: routingReducer,
  word: wordReducer,
});
