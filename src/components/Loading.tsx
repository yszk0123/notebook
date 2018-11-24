import React from 'react';
import { AppState } from '../store/app/app-type';
import useRedux from '../store/useRedux';
import { styled } from '../styled-components';
import { Icon } from './Icon';

interface Props {}

const Container = styled.div`
  font-size: 96px;
  display: flex;
  color: ${({ theme }) => theme.loadingColorFg};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => 2 * theme.space}px;
`;

export const Loading: React.FunctionComponent<Props> = ({ children }) => {
  const [{ loading }, dispatch] = useRedux(mapState);

  return loading ? (
    <Container>
      <Icon icon="spinner" spin pulse />
    </Container>
  ) : (
    <StyledLoading>{children}</StyledLoading>
  );
};

function mapState(state: AppState) {
  const { loading } = state.global;

  return {
    loading,
  };
}
