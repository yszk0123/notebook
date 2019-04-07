import { createSelector } from 'reselect';
import { WordGlobalState } from './WordState';

interface State extends WordGlobalState {}

export const wordsSelector = createSelector(
  (state: State) => state.word.wordIds,
  (state: State) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);

export const outdatedWordsSelector = createSelector(
  (state: State) => state.word.outdatedWordIds,
  (state: State) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);
