import { EffectCreator } from '../../redux';
import { AppState } from '../app/app-type';
import { CounterAction, counterActions } from './counter-type';

type CounterEffectCreator = EffectCreator<AppState, CounterAction>;

const incrementByTen: CounterEffectCreator = () => dispatch => {
  dispatch(counterActions.incrementBy(9));
  dispatch(counterActions.increment());
};

export const counterEffects = { incrementByTen };
