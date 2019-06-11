import { useCallback, useState } from 'react';
import {
  GetProp,
  HomeScreenQuery,
  useHomeScreenQuery,
  useUpdateCounterMutation,
} from '../../../../GraphQLType';

interface Props {
  count: number;
  loading: boolean;
  notes: Note[];
  onDecrement: () => void;
  onIncrement: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

// FIXME: Remove (#54)
type Counter = GetProp<HomeScreenQuery, 'counter', 0>;
type Note = GetProp<HomeScreenQuery, 'notes', 0>;
const loadingCounter: Counter[] = [];
const loadingNotes: Note[] = [];

export function useHomeScreen(): Props {
  const { data, refetch, loading } = useHomeScreenQuery();
  const [refreshing, setRefreshing] = useState(false);
  const counter = (data && data.counter) || loadingCounter;
  const notes = (data && data.notes) || loadingNotes;
  const count = counter.length ? counter[0].count : -1;

  const update = useUpdateCounterMutation();

  const onIncrement = useCallback(() => {
    update({ variables: { input: { count: count + 1 } } });
  }, [update, count]);

  const onDecrement = useCallback(() => {
    update({ variables: { input: { count: Math.max(count - 1, 0) } } });
  }, [update, count]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {
    count,
    loading,
    notes,
    onDecrement,
    onIncrement,
    onRefresh,
    refreshing,
  };
}
