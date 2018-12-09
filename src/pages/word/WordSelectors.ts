import { createSelector } from 'reselect';
import { AppState } from '../../app/app-type';

export const getWords = createSelector(
  (state: AppState) => state.word.wordIds,
  (state: AppState) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);

export const getOutdatedWords = createSelector(
  (state: AppState) => state.word.outdatedWordIds,
  (state: AppState) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);
