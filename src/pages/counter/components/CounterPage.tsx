import React, { useCallback } from 'react';
import { counterEffects } from '..';
import { AppState } from '../../../app/app-type';
import { VerticalStack } from '../../../app/components/layouts/VerticalStack';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { styled } from '../../../styled-components';
import { counterActions } from '../counter-type';

const CounterPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.space}px;
`;

const Count = styled(Text)`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space}px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space}px;
`;

const StyledButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.space}px;
`;

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <CounterPageWrapper>
      <VerticalStack>
        <Count>Count: {count}</Count>
        <ButtonGroup>
          <StyledButton onClick={increment}>Increment</StyledButton>
          <StyledButton onClick={incrementByTen}>Increment by 10</StyledButton>
        </ButtonGroup>
      </VerticalStack>
    </CounterPageWrapper>
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
