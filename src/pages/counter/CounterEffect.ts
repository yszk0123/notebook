import { Effect } from '../../app/redux';
import { CounterAction, counterActions } from './CounterActions';
import { CounterGlobalState } from './CounterState';

interface CounterEffect extends Effect<CounterGlobalState, CounterAction> {}

const incrementByTen: CounterEffect = () => async dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };
