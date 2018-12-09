import { createSelector } from 'reselect';
import { AppState } from '../../app/app-type';

export const selectWords = createSelector(
  (state: AppState) => state.word.wordIds,
  (state: AppState) => state.word.wordsById,
  (wordIds, wordsbyId) => wordIds.map(id => wordsbyId[id]),
);
