import { createAction, GetAction } from '../../redux';

export const enum CounterActionType {
  INCREMENT = 'INCREMENT',
  INCREMENT_BY = 'INCREMENT_BY',
}

export const counterActions = {
  increment: createAction(CounterActionType.INCREMENT),
  incrementBy: createAction(CounterActionType.INCREMENT_BY, (n: number) => ({
    payload: { n },
  })),
};

export type CounterAction = GetAction<typeof counterActions>;

export interface CounterState {
  count: number;
}
