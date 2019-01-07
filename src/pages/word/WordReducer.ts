import { difference, pull, uniq } from 'lodash';
import { Reducer } from 'redux';
import { createRecord } from '../../utils/createRecord';
import { updateState } from '../../utils/updateState';
import { WordId } from './entities/Word';
import { WordAction, WordActionType } from './WordActions';
import { WordLocalState } from './WordState';

const initialState: WordLocalState = {
  loading: true,
  outdatedWordIds: [],
  saving: false,
  wordIds: [],
  wordsById: {},
};

export const wordReducer: Reducer<WordLocalState, WordAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case WordActionType.REMOVE:
      return { ...state, saving: true };
    case WordActionType.REMOVE_SUCCESS: {
      const { removedWordId } = action.payload;

      return updateState(state, {
        outdatedWordIds: (ids: Array<WordId>) => pull(ids, removedWordId),
        saving: { $set: false },
        wordIds: (ids: Array<WordId>) => pull(ids, removedWordId),
        wordsById: { $unset: [removedWordId] },
      });
    }
    case WordActionType.SAVE:
    case WordActionType.SAVE_ALL:
      return { ...state, saving: true };
    case WordActionType.SAVE_SUCCESS: {
      const { word } = action.payload;

      return updateState(state, {
        outdatedWordIds: (ids: Array<WordId>) =>
          ids.filter(id => id !== word.id),
        saving: { $set: false },
      });
    }
    case WordActionType.SAVE_ALL_SUCCESS: {
      const { words } = action.payload;
      const updatedIds = words.map(word => word.id);

      return updateState(state, {
        outdatedWordIds: (ids: Array<WordId>) => difference(ids, updatedIds),
        saving: { $set: false },
      });
    }
    case WordActionType.LOAD:
      return { ...state, loading: true };
    case WordActionType.LOAD_SUCCESS: {
      const { words } = action.payload;
      const newWordIds = words.map(word => word.id);
      const newWordsById = createRecord(words, word => word.id);

      return updateState(state, {
        loading: { $set: false },
        wordIds: { $set: newWordIds },
        wordsById: { $set: newWordsById },
      });
    }
    // FIXME: Implement
    // case WordActionType.REFETCH_SUCCESS: {
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
    case WordActionType.ADD_SUCCESS: {
      const { word } = action.payload;

      return updateState(state, {
        loading: { $set: false },
        wordIds: (ids: Array<WordId>) => uniq([word.id, ...ids]),
        wordsById: { [word.id]: { $set: word } },
      });
    }
    case WordActionType.UPDATE_CONTENT: {
      const { word, content } = action.payload;

      return updateState(state, {
        outdatedWordIds: (ids: Array<WordId>) => uniq([...ids, word.id]),
        wordsById: {
          [word.id]: {
            content: { $set: content },
          },
        },
      });
    }
    case WordActionType.UPDATE_CREATED_AT: {
      const { word, createdAt } = action.payload;

      return updateState(state, {
        outdatedWordIds: (ids: Array<WordId>) => uniq([...ids, word.id]),
        wordsById: {
          [word.id]: {
            createdAt: { $set: createdAt },
          },
        },
      });
    }
    default:
      return state;
  }
};
