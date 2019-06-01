import { combineReducers, Reducer } from 'redux';
import { routingReducer } from '../application/routing';
import { counterReducer } from '../OLD_pages/counter';
import { wordReducer } from '../OLD_pages/word';
import { RootState } from './RootState';

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  counter: counterReducer,
  routing: routingReducer,
  word: wordReducer,
});
