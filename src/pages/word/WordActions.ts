import {
  createAction,
  createActionWithPayload,
  GetAction,
} from '../../app/redux';
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

interface AddPayload {
  userId: string;
  content: string;
}
interface Add {
  type: WordActionType.ADD;
  payload: AddPayload;
}
function add(payload: AddPayload): Add {
  return {
    payload,
    type: WordActionType.ADD,
  };
}

interface AddSuccessPayload {
  userId: string;
  word: Word;
}
interface AddSuccess {
  type: WordActionType.ADD_SUCCESS;
  payload: AddSuccessPayload;
}
function addSuccess(payload: AddSuccessPayload): AddSuccess {
  return {
    payload,
    type: WordActionType.ADD_SUCCESS,
  };
}

const load = createAction(WordActionType.LOAD);

interface LoadSuccessPayload {
  words: Array<Word>;
}
const loadSuccess = createActionWithPayload<
  WordActionType.LOAD_SUCCESS,
  LoadSuccessPayload
>(WordActionType.LOAD_SUCCESS);

interface RemovePayload {
  userId: string;
  word: Word;
}
const remove = createActionWithPayload<WordActionType.REMOVE, RemovePayload>(
  WordActionType.REMOVE,
);

interface RemoveSuccessPayload {
  userId: string;
  removedWordId: WordId;
}
const removeSuccess = createActionWithPayload<
  WordActionType.REMOVE_SUCCESS,
  RemoveSuccessPayload
>(WordActionType.REMOVE_SUCCESS);

interface SaveSuccessPayload {
  userId: string;
  word: Word;
}
const saveSuccess = createActionWithPayload<
  WordActionType.SAVE_SUCCESS,
  SaveSuccessPayload
>(WordActionType.SAVE_SUCCESS);

interface SavePayload {
  userId: string;
  word: Word;
}
const save = createActionWithPayload<WordActionType.SAVE, SavePayload>(
  WordActionType.SAVE,
);

interface SaveAllPayload {
  userId: string;
  words: Array<Word>;
}
const saveAll = createActionWithPayload<
  WordActionType.SAVE_ALL,
  SaveAllPayload
>(WordActionType.SAVE_ALL);

interface SaveAllSuccessPayload {
  userId: string;
  words: Array<Word>;
}
const saveAllSuccess = createActionWithPayload<
  WordActionType.SAVE_ALL_SUCCESS,
  SaveAllSuccessPayload
>(WordActionType.SAVE_ALL_SUCCESS);

interface UpdateContentPayload {
  userId: string;
  word: Word;
  content: string;
}
const updateContent = createActionWithPayload<
  WordActionType.UPDATE_CONTENT,
  UpdateContentPayload
>(WordActionType.UPDATE_CONTENT);

interface UpdateCreatedAtPayload {
  userId: string;
  word: Word;
  createdAt: number;
}
const updateCreatedAt = createActionWithPayload<
  WordActionType.UPDATE_CREATED_AT,
  UpdateCreatedAtPayload
>(WordActionType.UPDATE_CREATED_AT);

export const wordActions = {
  add,
  addSuccess,
  load,
  loadSuccess,
  remove,
  removeSuccess,
  save,
  saveAll,
  saveAllSuccess,
  saveSuccess,
  updateContent,
  updateCreatedAt,
};

export type WordAction = GetAction<typeof wordActions>;
