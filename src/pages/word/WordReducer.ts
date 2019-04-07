import { difference, pull, uniq } from 'lodash';
import { createReducer } from '../../application/DucksType';
import { createRecord } from '../../application/utils/createRecord';
import { identity } from '../../application/utils/identity';
import { updateState } from '../../application/utils/updateState';
import { WordID } from './entities/Word';
import { WordAction, WordActionType } from './WordActions';
import { WordLocalState } from './WordState';

const initialState: WordLocalState = {
  loading: true,
  outdatedWordIds: [],
  saving: false,
  wordIds: [],
  wordsById: {},
};

export const wordReducer = createReducer<WordLocalState, WordActionType, WordAction>(
  {
    [WordActionType.REMOVE]: state => ({ ...state, saving: true }),
    [WordActionType.REMOVE_SUCCESS]: (state, { payload: { removedWordId } }) =>
      updateState(state, {
        outdatedWordIds: (ids: WordID[]) => pull(ids, removedWordId),
        saving: { $set: false },
        wordIds: (ids: WordID[]) => pull(ids, removedWordId),
        wordsById: { $unset: [removedWordId] },
      }),
    [WordActionType.SAVE]: state => ({ ...state, saving: true }),
    [WordActionType.SAVE_ALL]: state => ({ ...state, saving: true }),
    [WordActionType.SAVE_SUCCESS]: (state, { payload: { word } }) =>
      updateState(state, {
        outdatedWordIds: (ids: WordID[]) => ids.filter(id => id !== word.id),
        saving: { $set: false },
      }),
    [WordActionType.SAVE_ALL_SUCCESS]: (state, { payload: { words } }) => {
      const updatedIds = words.map(word => word.id);

      return updateState(state, {
        outdatedWordIds: (ids: WordID[]) => difference(ids, updatedIds),
        saving: { $set: false },
      });
    },
    [WordActionType.LOAD]: state => ({ ...state, loading: true }),
    [WordActionType.LOAD_SUCCESS]: (state, { payload: { words } }) => {
      const newWordIds = words.map(word => word.id);
      const newWordsById = createRecord(words, word => word.id);

      return updateState(state, {
        loading: { $set: false },
        wordIds: { $set: newWordIds },
        wordsById: { $set: newWordsById },
      });
    },
    // FIXME: Implement
    // [WordActionType.REFETCH_SUCCESS: {
    //   const { words } = action.payload;
    //   const newWordIds = words.map(word => word.id);
    //   const newWordsById = createRecord(words, word => word.id);
    //
    //   return updateState(state, {
    //     loading: { $set: false },
    //     wordIds: (ids: WordId[]) => uniq([...ids, ...newWordIds]),
    //     wordsById: { $merge: newWordsById },
    //   });
    // }
    [WordActionType.ADD_SUCCESS]: (state, { payload: { word } }) =>
      updateState(state, {
        loading: { $set: false },
        wordIds: (ids: WordID[]) => uniq([word.id, ...ids]),
        wordsById: { [word.id]: { $set: word } },
      }),
    [WordActionType.UPDATE_CONTENT]: (state, { payload: { word, content } }) =>
      updateState(state, {
        outdatedWordIds: (ids: WordID[]) => uniq([...ids, word.id]),
        wordsById: {
          [word.id]: {
            content: { $set: content },
          },
        },
      }),
    [WordActionType.UPDATE_CREATED_AT]: (state, { payload: { word, createdAt } }) =>
      updateState(state, {
        outdatedWordIds: (ids: WordID[]) => uniq([...ids, word.id]),
        wordsById: {
          [word.id]: {
            createdAt: { $set: createdAt },
          },
        },
      }),
    [WordActionType.ADD]: identity,
  },
  initialState,
);
