import { Spec } from 'immutability-helper';
import { uniq } from 'lodash';
import { Reducer } from 'redux';
import { Word, WordId } from '../../models/Word';
import { createRecord } from '../../utils/createRecord';
import { updateState } from '../../utils/updateState';
import { WordAction, WordActionType, WordState } from './word-type';

const initialState: WordState = {
  loading: true,
  saving: false,
  wordIds: [],
  wordsById: {},
};

export const wordReducer: Reducer<WordState, WordAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case WordActionType.SAVE:
    case WordActionType.SAVE_ALL:
      return { ...state, saving: true };
    case WordActionType.SAVE_SUCCESS: {
      const { word } = action.payload;
      return updateState(state, {
        saving: { $set: false },
        wordsById: {
          [word.id]: { dirty: { $set: false } },
        },
      });
    }
    case WordActionType.SAVE_ALL_SUCCESS: {
      const { savedWords } = action.payload;

      // FIXME: Refactor
      const wordsByIdSpec = {} as Record<string, Spec<Word>>;
      savedWords.forEach(word => {
        wordsByIdSpec[word.id] = { dirty: { $set: false } };
      });

      return updateState(state, {
        saving: { $set: false },
        wordsById: wordsByIdSpec,
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
        wordIds: (oldWordIds: WordId[]) => uniq([...oldWordIds, ...newWordIds]),
        wordsById: { $merge: newWordsById },
      });
    }
    case WordActionType.ADD_SUCCESS: {
      const { word } = action.payload;

      return updateState(state, {
        loading: { $set: false },
        wordIds: (oldWordIds: WordId[]) => uniq([...oldWordIds, word.id]),
        wordsById: { [word.id]: { $set: word } },
      });
    }
    case WordActionType.UPDATE_CONTENT: {
      const { word, content } = action.payload;

      return updateState(state, {
        wordsById: {
          [word.id]: {
            content: { $set: content },
            dirty: { $set: true },
          },
        },
      });
    }
    default:
      return state;
  }
};
