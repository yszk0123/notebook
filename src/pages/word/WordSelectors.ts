import { createSelector } from 'reselect';
import { WordGlobalState } from './word-type';

interface State extends WordGlobalState {}

export const getWords = createSelector(
  (state: State) => state.word.wordIds,
  (state: State) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);

export const getOutdatedWords = createSelector(
  (state: State) => state.word.outdatedWordIds,
  (state: State) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);
