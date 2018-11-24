import React from 'react';
import { Icon } from '../../components/Icon';
import { Page } from '../../routing/routing-type';
import { styled } from '../../styled-components';
import { AppState } from '../app-type';
import useRedux from '../useRedux';

interface Props {
  page: Page;
}

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
  padding-top: ${({ theme }) => 2 * theme.space}px;
`;

export const Loading: React.FunctionComponent<Props> = ({ page }) => {
  const [{ loading }, dispatch] = useRedux(mapState);
  const { content, loading: loadingContent } = page;

  if (loading) {
    return loadingContent ? (
      loadingContent
    ) : (
      <Container>
        <Icon icon="spinner" spin={true} pulse={true} />
      </Container>
    );
  }

  return <StyledLoading>{content}</StyledLoading>;
};

function mapState(state: AppState) {
  const { loading } = state.routing;

  return {
    loading,
  };
}
