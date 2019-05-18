import { combineReducers, Reducer } from 'redux';
import { routingReducer } from '../application/routing';
import { counterReducer } from '../pages/counter';
import { wordReducer } from '../pages/word';
import { RootState } from './RootState';

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  counter: counterReducer,
  routing: routingReducer,
  word: wordReducer,
});
