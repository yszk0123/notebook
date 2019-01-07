import { createAction } from '../../app/redux';

export const enum CounterActionType {
  INCREMENT = 'counter/INCREMENT',
  INCREMENT_BY = 'counter/INCREMENT_BY',
}

interface Increment {
  type: CounterActionType.INCREMENT;
}
const increment = createAction(CounterActionType.INCREMENT);

interface IncrementByPayload {
  n: number;
}
interface IncrementBy {
  type: CounterActionType.INCREMENT_BY;
  payload: IncrementByPayload;
}
function incrementBy(n: number): IncrementBy {
  return {
    payload: { n },
    type: CounterActionType.INCREMENT_BY,
  };
}

export const counterActions = {
  increment,
  incrementBy,
};

export type CounterAction = Increment | IncrementBy;
