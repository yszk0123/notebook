import {
  createAction,
  createActionWithPayload,
  GetAction,
} from '../../app/redux';

export const enum CounterActionType {
  INCREMENT = 'counter/INCREMENT',
  INCREMENT_BY = 'counter/INCREMENT_BY',
}

const increment = createAction(CounterActionType.INCREMENT);

interface IncrementByPayload {
  n: number;
}
const incrementBy = createActionWithPayload<
  IncrementByPayload,
  CounterActionType.INCREMENT_BY
>(CounterActionType.INCREMENT_BY);

export const counterActions = {
  increment,
  incrementBy,
};

export type CounterAction = GetAction<typeof counterActions>;
