import { Reducer } from 'redux';
import { NoteAction, NoteActionType, NoteState } from './note-type';

const initialState: NoteState = { saving: false, loading: true, note: null };

export const noteReducer: Reducer<NoteState, NoteAction> = (
  state = initialState,
  action,
) => {
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
