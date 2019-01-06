import { createAction, GetAction } from '../../app/redux';
import { Word, WordId } from './entities/Word';

export const enum WordActionType {
  ADD = 'word/ADD',
  ADD_SUCCESS = 'word/ADD_SUCCESS',
  REMOVE = 'word/REMOVE',
  REMOVE_SUCCESS = 'word/REMOVE_SUCCESS',
  UPDATE_CONTENT = 'word/UPDATE_CONTENT',
  UPDATE_CREATED_AT = 'word/UPDATE_CREATED_AT',
  LOAD = 'word/LOAD',
  LOAD_SUCCESS = 'word/LOAD_SUCCESS',
  SAVE = 'word/SAVE',
  SAVE_SUCCESS = 'word/SAVE_SUCCESS',
  SAVE_ALL = 'word/SAVE_ALL',
  SAVE_ALL_SUCCESS = 'word/SAVE_ALL_SUCCESS',
}

export const wordActions = {
  add: createAction(
    WordActionType.ADD,
    (payload: { userId: string; content: string }) => ({ payload }),
  ),
  addSuccess: createAction(
    WordActionType.ADD_SUCCESS,
    (payload: { userId: string; word: Word }) => ({ payload }),
  ),
  load: createAction(WordActionType.LOAD),
  loadSuccess: createAction(
    WordActionType.LOAD_SUCCESS,
    (payload: { words: Array<Word> }) => ({ payload }),
  ),
  remove: createAction(
    WordActionType.REMOVE,
    (payload: { userId: string; word: Word }) => ({ payload }),
  ),
  removeSuccess: createAction(
    WordActionType.REMOVE_SUCCESS,
    (payload: { userId: string; removedWordId: WordId }) => ({ payload }),
  ),
  save: createAction(
    WordActionType.SAVE,
    (payload: { userId: string; word: Word }) => ({ payload }),
  ),
  saveAll: createAction(
    WordActionType.SAVE_ALL,
    (payload: { userId: string; words: Array<Word> }) => ({ payload }),
  ),
  saveAllSuccess: createAction(
    WordActionType.SAVE_ALL_SUCCESS,
    (payload: { userId: string; words: Array<Word> }) => ({ payload }),
  ),
  saveSuccess: createAction(
    WordActionType.SAVE_SUCCESS,
    (payload: { userId: string; word: Word }) => ({ payload }),
  ),
  updateContent: createAction(
    WordActionType.UPDATE_CONTENT,
    (payload: { userId: string; word: Word; content: string }) => ({ payload }),
  ),
  updateCreatedAt: createAction(
    WordActionType.UPDATE_CREATED_AT,
    (payload: { userId: string; word: Word; createdAt: number }) => ({
      payload,
    }),
  ),
};

export type WordAction = GetAction<typeof wordActions>;

export interface WordLocalState {
  loading: boolean;
  saving: boolean;
  outdatedWordIds: Array<WordId>;
  wordIds: Array<WordId>;
  wordsById: Record<WordId, Word>;
}

export interface WordGlobalState {
  word: WordLocalState;
}
