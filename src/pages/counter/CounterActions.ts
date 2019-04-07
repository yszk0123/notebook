import { action, GetAction } from '../../app/DucksType';

export const enum CounterActionType {
  INCREMENT = 'counter/INCREMENT',
  INCREMENT_BY = 'counter/INCREMENT_BY',
}

export const counterActions = {
  increment: action(CounterActionType.INCREMENT),
  incrementBy: action<CounterActionType.INCREMENT_BY, { n: number }>(
    CounterActionType.INCREMENT_BY,
  ),
};

export type CounterAction = GetAction<typeof counterActions>;
