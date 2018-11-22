import { Reducer } from 'redux';
import { createAction, EffectCreator, GetAction } from '../../redux';
import { AppState } from '../app/app-type';
import { CounterState } from './counter-type';

/**
 * Action types
 */

enum CounterActionType {
  INCREMENT = 'INCREMENT',
  INCREMENT_BY = 'INCREMENT_BY',
}

/**
 * Action creators
 */

export const counterActions = {
  increment: createAction(CounterActionType.INCREMENT),
  incrementBy: createAction(CounterActionType.INCREMENT_BY, (n: number) => ({
    payload: { n },
  })),
};

export type CounterAction = GetAction<typeof counterActions>;

/**
 * Effect creators
 */

type CounterEffectCreator = EffectCreator<AppState, CounterAction>;

const incrementByTen: CounterEffectCreator = () => dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };

/**
 * Reducers
 */

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
