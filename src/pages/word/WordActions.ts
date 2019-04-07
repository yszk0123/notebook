import { action, GetAction } from '../../app/DucksType';
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
  add: action<WordActionType.ADD, { userId: string; content: string }>(WordActionType.ADD),
  addSuccess: action<WordActionType.ADD_SUCCESS, { userId: string; word: Word }>(
    WordActionType.ADD_SUCCESS,
  ),
  load: action(WordActionType.LOAD),
  loadSuccess: action<WordActionType.LOAD_SUCCESS, { words: Word[] }>(WordActionType.LOAD_SUCCESS),
  remove: action<WordActionType.REMOVE, { userId: string; word: Word }>(WordActionType.REMOVE),
  removeSuccess: action<WordActionType.REMOVE_SUCCESS, { userId: string; removedWordId: WordId }>(
    WordActionType.REMOVE_SUCCESS,
  ),
  save: action<WordActionType.SAVE, { userId: string; word: Word }>(WordActionType.SAVE),
  saveAll: action<WordActionType.SAVE_ALL, { userId: string; words: Word[] }>(
    WordActionType.SAVE_ALL,
  ),
  saveAllSuccess: action<WordActionType.SAVE_ALL_SUCCESS, { userId: string; words: Word[] }>(
    WordActionType.SAVE_ALL_SUCCESS,
  ),
  saveSuccess: action<WordActionType.SAVE_SUCCESS, { userId: string; word: Word }>(
    WordActionType.SAVE_SUCCESS,
  ),
  updateContent: action<
    WordActionType.UPDATE_CONTENT,
    { userId: string; word: Word; content: string }
  >(WordActionType.UPDATE_CONTENT),
  updateCreatedAt: action<
    WordActionType.UPDATE_CREATED_AT,
    { userId: string; word: Word; createdAt: number }
  >(WordActionType.UPDATE_CREATED_AT),
};

export type WordAction = GetAction<typeof wordActions>;
