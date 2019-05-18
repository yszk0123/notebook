import { createReducer } from '../../application/DucksType';
import { CounterAction, CounterActionType } from './CounterActions';
import { CounterLocalState } from './CounterState';

const initialState: CounterLocalState = { count: 0 };

export const counterReducer = createReducer<CounterLocalState, CounterActionType, CounterAction>(
  {
    [CounterActionType.INCREMENT]: state => ({ ...state, count: state.count + 1 }),
    [CounterActionType.INCREMENT_BY]: (state, { payload: { n } }) => ({
      ...state,
      count: state.count + n,
    }),
  },
  initialState,
);
