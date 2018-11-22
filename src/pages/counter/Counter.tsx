import React, { useCallback } from 'react';
import { Text } from '../../components/Text';
import { AppState } from '../../store/app/app-type';
import { counterEffects } from '../../store/counter';
import { counterActions } from '../../store/counter/counter-type';
import useRedux from '../../store/useRedux';

interface Props {}

export const Counter: React.FunctionComponent<Props> = () => {
  const [{ count, loading }, dispatch] = useRedux(mapState);

  const increment = useCallback(() => dispatch(counterActions.increment()), [
    dispatch,
  ]);
  const incrementByTen = useCallback(
    () => dispatch(counterEffects.incrementByTen()),
    [dispatch],
  );

  return (
    <>
      {loading ? <div>Loading...</div> : null}
      <Text>Count: {count}</Text>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementByTen}>Increment by 10</button>
    </>
  );
};

function mapState(state: AppState) {
  const { count } = state.counter;
  const { loading } = state.global;

  return {
    count,
    loading,
  };
}
