import React from 'react';
import { Icon } from '../../components/Icon';
import { Page } from '../../routing/routing-type';
import { styled } from '../../styled-components';
import { AppState } from '../app-type';
import useRedux from '../useRedux';

interface Props {
  page: Page;
}

const CenterWrapper = styled.div`
  font-size: 96px;
  display: flex;
  color: ${({ theme }) => theme.loadingColorFg};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const defaultLoadingContent = (
  <CenterWrapper>
    <Icon icon="spinner" spin={true} pulse={true} />
  </CenterWrapper>
);

export const PageContainer: React.FunctionComponent<Props> = ({ page }) => {
  const [{ loading }, _dispatch] = useRedux(mapState);
  const { content, loading: loadingContent = defaultLoadingContent } = page;

  return loading ? loadingContent : content;
};

function mapState(state: AppState) {
  const { loading } = state.routing;

  return {
    loading,
  };
}
