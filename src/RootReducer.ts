import { combineReducers, Reducer } from 'redux';
import { counterReducer } from './pages/counter';
import { noteReducer } from './pages/note';
import { wordReducer } from './pages/word';
import { RootState } from './RootState';
import { routingReducer } from './routing';

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  counter: counterReducer,
  note: noteReducer,
  routing: routingReducer,
  word: wordReducer,
});
