import { GetAction } from '../../application/DucksType';
import { action } from '../../application/ExperimentalDucksType';
import { Word, WordID } from './entities/Word';

export const enum WordActionType {
  ADD = 'word/ADD',
  ADD_SUCCESS = 'word/ADD_SUCCESS',
  REMOVE = 'word/REMOVE',
  REMOVE_SUCCESS = 'word/REMOVE_SUCCESS',
  UPDATE_CONTENT = 'word/UPDATE_CONTENT',
  UPDATE_CREATED_AT = 'word/UPDATE_CREATED_AT',
  LOAD = 'word/LOAD',
  LOAD_SUCCESS = 'word/LOAD_SUCCESS',
  LOAD_FAILURE = 'word/LOAD_FAILURE',
  LOAD_ALL = 'word/LOAD_ALL',
  LOAD_ALL_SUCCESS = 'word/LOAD_ALL_SUCCESS',
  SAVE = 'word/SAVE',
  SAVE_SUCCESS = 'word/SAVE_SUCCESS',
  SAVE_ALL = 'word/SAVE_ALL',
  SAVE_ALL_SUCCESS = 'word/SAVE_ALL_SUCCESS',
}

export const wordActions = {
  add: action(WordActionType.ADD)<{ userId: string; content: string }>(),
  addSuccess: action(WordActionType.ADD_SUCCESS)<{ userId: string; word: Word }>(),
  load: action(WordActionType.LOAD)(),
  loadAll: action(WordActionType.LOAD_ALL)(),
  loadAllSuccess: action(WordActionType.LOAD_ALL_SUCCESS)<{ words: Word[] }>(),
  loadFailure: action(WordActionType.LOAD_FAILURE)(),
  loadSuccess: action(WordActionType.LOAD_SUCCESS)<{ word: Word }>(),
  remove: action(WordActionType.REMOVE)<{ userId: string; word: Word }>(),
  removeSuccess: action(WordActionType.REMOVE_SUCCESS)<{ userId: string; removedWordId: WordID }>(),
  save: action(WordActionType.SAVE)<{ userId: string; word: Word }>(),
  saveAll: action(WordActionType.SAVE_ALL)<{ userId: string; words: Word[] }>(),
  saveAllSuccess: action(WordActionType.SAVE_ALL_SUCCESS)<{ userId: string; words: Word[] }>(),
  saveSuccess: action(WordActionType.SAVE_SUCCESS)<{ userId: string; word: Word }>(),
  updateContent: action(WordActionType.UPDATE_CONTENT)<{
    userId: string;
    word: Word;
    content: string;
  }>(),
  updateCreatedAt: action(WordActionType.UPDATE_CREATED_AT)<{
    userId: string;
    word: Word;
    createdAt: number;
  }>(),
};

export type WordAction = GetAction<typeof wordActions>;