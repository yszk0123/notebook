import { Reducer } from 'redux';
import { NoteAction, NoteActionType } from './NoteActions';
import { NoteLocalState } from './NoteState';

const initialState: NoteLocalState = {
  loading: true,
  note: null,
  saving: false,
};

export const noteReducer: Reducer<NoteLocalState, NoteAction> = (state = initialState, action) => {
  switch (action.type) {
    case NoteActionType.SAVE:
      return { ...state, saving: true };
    case NoteActionType.SAVE_SUCCESS:
      return { ...state, saving: false };
    case NoteActionType.LOAD:
      return { ...state, loading: true };
    case NoteActionType.LOAD_SUCCESS: {
      const { note } = action.payload;
      return { ...state, loading: false, note };
    }
    default:
      return state;
  }
};
