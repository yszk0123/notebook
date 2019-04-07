import { Thunk } from '../../application/DucksType';
import { CounterAction, counterActions } from './CounterActions';
import { CounterGlobalState } from './CounterState';

type CounterThunk<Payload = void> = Thunk<CounterGlobalState, Payload, CounterAction>;

const incrementByTen: CounterThunk = () => async (dispatch, _getState, _injections) => {
  dispatch(counterActions.incrementBy({ n: 9 }));
  dispatch(counterActions.increment());
};

export const counterSideEffects = { incrementByTen };
