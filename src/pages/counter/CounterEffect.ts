import { AppState } from '../../app/app-type';
import { Effect } from '../../redux';
import { CounterAction, counterActions } from './counter-type';

type CounterEffectCreator = Effect<AppState, CounterAction>;

const incrementByTen: CounterEffectCreator = () => async dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };
