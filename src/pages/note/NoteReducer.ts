import { Reducer } from 'redux';
import { NoteAction, NoteActionType, NoteState } from './note-type';

const initialState: NoteState = { saving: false };

export const noteReducer: Reducer<NoteState, NoteAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case NoteActionType.SAVE:
      return { ...state, saving: true };
    case NoteActionType.SAVE_SUCCESS:
      return { ...state, saving: false };
    default:
      return state;
  }
};
