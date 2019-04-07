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
  words: Word[];
}
const loadSuccess = createActionWithPayload<
  LoadSuccessPayload,
  WordActionType.LOAD_SUCCESS
>(WordActionType.LOAD_SUCCESS);

interface RemovePayload {
  userId: string;
  word: Word;
}
const remove = createActionWithPayload<RemovePayload, WordActionType.REMOVE>(
  WordActionType.REMOVE,
);

interface RemoveSuccessPayload {
  userId: string;
  removedWordId: WordId;
}
const removeSuccess = createActionWithPayload<
  RemoveSuccessPayload,
  WordActionType.REMOVE_SUCCESS
>(WordActionType.REMOVE_SUCCESS);

interface SaveSuccessPayload {
  userId: string;
  word: Word;
}
const saveSuccess = createActionWithPayload<
  SaveSuccessPayload,
  WordActionType.SAVE_SUCCESS
>(WordActionType.SAVE_SUCCESS);

interface SavePayload {
  userId: string;
  word: Word;
}
const save = createActionWithPayload<SavePayload, WordActionType.SAVE>(
  WordActionType.SAVE,
);

interface SaveAllPayload {
  userId: string;
  words: Word[];
}
const saveAll = createActionWithPayload<
  SaveAllPayload,
  WordActionType.SAVE_ALL
>(WordActionType.SAVE_ALL);

interface SaveAllSuccessPayload {
  userId: string;
  words: Word[];
}
const saveAllSuccess = createActionWithPayload<
  SaveAllSuccessPayload,
  WordActionType.SAVE_ALL_SUCCESS
>(WordActionType.SAVE_ALL_SUCCESS);

interface UpdateContentPayload {
  userId: string;
  word: Word;
  content: string;
}
const updateContent = createActionWithPayload<
  UpdateContentPayload,
  WordActionType.UPDATE_CONTENT
>(WordActionType.UPDATE_CONTENT);

interface UpdateCreatedAtPayload {
  userId: string;
  word: Word;
  createdAt: number;
}
const updateCreatedAt = createActionWithPayload<
  UpdateCreatedAtPayload,
  WordActionType.UPDATE_CREATED_AT
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
