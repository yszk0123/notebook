import { CounterScreenQuery, useCounterScreenQuery } from '../../../GraphQLType';

interface Props {
  count: number;
  loading: boolean;
}

const loadingData: CounterScreenQuery = {
  counter: [],
};

export function useCounterScreen(): Props {
  const { data = loadingData, loading } = useCounterScreenQuery();
  const { counter } = data;

  return {
    count: counter[0].count,
    loading,
  };
}
