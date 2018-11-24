import { AppState } from '../../app/app-type';
import { EffectCreator } from '../../redux';
import { CounterAction, counterActions } from './counter-type';

type CounterEffectCreator = EffectCreator<AppState, CounterAction>;

const incrementByTen: CounterEffectCreator = () => async dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };
