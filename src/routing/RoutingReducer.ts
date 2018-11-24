import { Reducer } from 'redux';
import { GlobalAction, GlobalActionType, GlobalState } from './routing-type';

const initialState: GlobalState = { loading: true, user: null };

export const routingReducer: Reducer<GlobalState, GlobalAction> = (
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
