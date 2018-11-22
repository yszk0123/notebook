import React, { useCallback } from 'react';
import { AppState } from '../../store/app/AppType';
import { counterActions, counterEffects } from '../../store/counter/Counter';
import useRedux from '../../store/useRedux';
import { Text } from '../../Text';

interface Props {}

export const Counter: React.FunctionComponent<Props> = () => {
  const [{ count }, dispatch] = useRedux(mapState);

  const increment = useCallback(() => dispatch(counterActions.increment()), [
    dispatch,
  ]);
  const incrementByTen = useCallback(
    () => dispatch(counterEffects.incrementByTen()),
    [dispatch],
  );

  return (
    <>
      <Text>Count: {count}</Text>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementByTen}>Increment by 10</button>
    </>
  );
};

function mapState(state: AppState) {
  const { count } = state.counter;

  return {
    count,
  };
}
