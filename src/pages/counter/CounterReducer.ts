import { Reducer } from 'redux';
import {
  CounterAction,
  CounterActionType,
  CounterLocalState,
} from './counter-type';

const initialState: CounterLocalState = { count: 0 };

export const counterReducer: Reducer<CounterLocalState, CounterAction> = (
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
