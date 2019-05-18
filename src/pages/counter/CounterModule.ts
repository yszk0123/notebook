import * as Rx from 'typeless/rx';
import { CounterActions, CounterState, useCounterModule } from './CounterInterface';

const initialState: CounterState = {
  count: 0,
  loading: false,
};

useCounterModule
  .epic()
  .on(CounterActions.incrementDelay, () => Rx.of(CounterActions.countDone()).pipe(Rx.delay(500)));

useCounterModule
  .reducer(initialState)
  .on(CounterActions.incrementDelay, state => {
    state.loading = true;
    state.count += 1;
  })
  .on(CounterActions.increment, state => {
    state.count += 1;
  })
  .on(CounterActions.decrement, state => {
    state.count -= 1;
  })
  .on(CounterActions.countDone, state => {
    state.loading = false;
  });
