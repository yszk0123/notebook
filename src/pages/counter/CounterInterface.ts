import { createModule } from 'typeless';

export const [useCounterModule, CounterActions, getCounterState] = createModule(Symbol('counter'))
  .withActions({
    countDone: null,
    decrement: null,
    increment: null,
    incrementDelay: null,
  })
  .withState<CounterState>();

export interface CounterState {
  count: number;
  loading: boolean;
}
