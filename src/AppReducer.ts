import { combineReducers, Reducer } from 'redux';
import { AppState } from './AppState';
import { counterReducer } from './pages/counter';
import { noteReducer } from './pages/note';
import { wordReducer } from './pages/word';
import { routingReducer } from './routing';

export const appReducer: Reducer<AppState> = combineReducers<AppState>({
  counter: counterReducer,
  note: noteReducer,
  routing: routingReducer,
  word: wordReducer,
});
