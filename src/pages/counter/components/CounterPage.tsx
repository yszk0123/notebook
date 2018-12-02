import React, { useCallback } from 'react';
import { counterEffects } from '..';
import { AppState } from '../../../app/app-type';
import { FullLayout } from '../../../app/components/layouts/FullLayout';
import useRedux from '../../../app/useRedux';
import { Text } from '../../../components/Text';
import { counterActions } from '../counter-type';

interface Props {}

export const CounterPage: React.FunctionComponent<Props> = () => {
  const [{ count, loading }, dispatch] = useRedux(mapState);

  const increment = useCallback(() => dispatch(counterActions.increment()), [
    dispatch,
  ]);
  const incrementByTen = useCallback(
    () => dispatch(counterEffects.incrementByTen()),
    [dispatch],
  );

  return (
    <FullLayout>
      {loading ? <div>Loading...</div> : null}
      <Text>Count: {count}</Text>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementByTen}>Increment by 10</button>
    </FullLayout>
  );
};

function mapState(state: AppState) {
  const { count } = state.counter;
  const { loading } = state.routing;

  return {
    count,
    loading,
  };
}
