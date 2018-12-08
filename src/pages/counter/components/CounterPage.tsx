import React, { useCallback } from 'react';
import { counterEffects } from '..';
import { AppState } from '../../../app/app-type';
import { CenterLayout } from '../../../app/components/layouts/CenterLayout';
import { VerticalStackLayout } from '../../../app/components/layouts/VerticalStackLayout';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { styled } from '../../../styled-components';
import { counterActions } from '../counter-type';

const Layout = styled(CenterLayout)`
  margin-top: ${({ theme }) => theme.space};
`;

const CountLayout = styled(Text)`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.space};
`;

const ButtonGroupLayout = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.space};

  & > ${Button} {
    margin: 0 ${({ theme }) => theme.space};
  }
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
    <Layout>
      <VerticalStackLayout>
        <CountLayout>Count: {count}</CountLayout>
        <ButtonGroupLayout>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={incrementByTen}>Increment by 10</Button>
        </ButtonGroupLayout>
      </VerticalStackLayout>
    </Layout>
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
