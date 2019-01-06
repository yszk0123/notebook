import { Effect } from '../../app/redux';
import {
  CounterAction,
  counterActions,
  CounterGlobalState,
} from './counter-type';

type CounterEffectCreator = Effect<CounterGlobalState, CounterAction>;

const incrementByTen: CounterEffectCreator = () => async dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };
