import { Reducer } from 'redux';
import { GlobalAction, GlobalActionType, GlobalState } from './global-type';

const initialState: GlobalState = { loading: true, user: null };

export const globalReducer: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GlobalActionType.LOGIN: {
      const { user } = action.payload;
      return { ...state, loading: false, user };
    }
    case GlobalActionType.LOGIN_FAILURE:
      return { ...state, loading: true };
    default:
      return state;
  }
};
