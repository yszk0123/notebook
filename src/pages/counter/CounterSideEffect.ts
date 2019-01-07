import { Effect } from '../../app/redux';
import { CounterAction, counterActions } from './CounterActions';
import { CounterGlobalState } from './CounterState';

interface CounterSideEffect extends Effect<CounterGlobalState, CounterAction> {}

const incrementByTen: CounterSideEffect = () => async dispatch => {
  dispatch(counterActions.incrementBy({ n: 9 }));
  dispatch(counterActions.increment());
};

export const counterSideEffects = { incrementByTen };
