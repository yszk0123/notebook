import { Reducer } from 'redux';
import { RoutingAction, RoutingActionType, RoutingState } from './routing-type';

const initialState: RoutingState = { loading: true, user: null };

export const routingReducer: Reducer<RoutingState, RoutingAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RoutingActionType.LOGIN: {
      const { user } = action.payload;
      return { ...state, loading: false, user };
    }
    case RoutingActionType.LOGIN_FAILURE:
      return { ...state, loading: true };
    default:
      return state;
  }
};
