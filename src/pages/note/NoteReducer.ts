import { createReducer } from '../../app/redux';
import { identity } from '../../app/utils/identity';
import { NoteAction, NoteActionType } from './NoteActions';
import { NoteLocalState } from './NoteState';

const initialState: NoteLocalState = {
  loading: true,
  note: null,
  saving: false,
};

export const noteReducer = createReducer<NoteLocalState, NoteActionType, NoteAction>(
  {
    [NoteActionType.SAVE]: state => ({ ...state, saving: true }),
    [NoteActionType.SAVE_SUCCESS]: state => ({ ...state, saving: false }),
    [NoteActionType.LOAD]: state => ({ ...state, loading: true }),
    [NoteActionType.LOAD_SUCCESS]: (state, { payload: { note } }) => ({
      ...state,
      loading: false,
      note,
    }),
    [NoteActionType.COPY_TEXT]: identity,
    [NoteActionType.COPY_TEXT_SUCCESS]: identity,
  },
  initialState,
);
