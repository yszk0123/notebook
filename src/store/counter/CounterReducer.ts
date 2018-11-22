import { Reducer } from 'redux';
import { CounterAction, CounterActionType, CounterState } from './counter-type';

const initialState: CounterState = { count: 0 };

export const counterReducer: Reducer<CounterState, CounterAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CounterActionType.INCREMENT:
      return { ...state, count: state.count + 1 };
    case CounterActionType.INCREMENT_BY:
      return { ...state, count: state.count + action.payload.n };
    default:
      return state;
  }
};
