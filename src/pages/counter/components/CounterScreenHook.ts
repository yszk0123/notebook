import { useCallback } from 'react';
import {
  CounterScreenQuery,
  useCounterScreenQuery,
  useUpdateCounterMutation,
} from '../../../GraphQLType';

interface Props {
  count: number;
  loading: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

// FIXME: Remove (#101)
type Counter = NonNullable<CounterScreenQuery['counter']>;
const loadingCounter: Counter = [];

export function useCounterScreen(): Props {
  const { data, loading } = useCounterScreenQuery();
  const counter = (data && data.counter) || loadingCounter;
  const count = counter.length ? counter[0].count : -1;

  const update = useUpdateCounterMutation();

  const onIncrement = useCallback(() => {
    update({ variables: { input: { count: count + 1 } } });
  }, [update, count]);

  const onDecrement = useCallback(() => {
    update({ variables: { input: { count: Math.max(count - 1, 0) } } });
  }, [update, count]);

  return {
    count,
    loading,
    onDecrement,
    onIncrement,
  };
}
