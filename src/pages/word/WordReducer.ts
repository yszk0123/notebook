import { uniq } from 'lodash';
import { Reducer } from 'redux';
import { WordId } from '../../models/Word';
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
      return { ...state, saving: true };
    case WordActionType.SAVE_SUCCESS:
      return { ...state, saving: false };
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
          },
        },
      });
    }
    default:
      return state;
  }
};
