import React from 'react';
import { Icon } from '../../components/Icon';
import { Page } from '../../routing/routing-type';
import { styled } from '../../styled-components';
import { AppState } from '../app-type';
import useRedux from '../useRedux';
import { CenterLayout } from './layouts/CenterLayout';
import { FullLayout } from './layouts/FullLayout';

interface Props {
  page: Page;
}

const DecoratedCenterLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

const defaultLoadingContent = (
  <DecoratedCenterLayout>
    <Icon icon="spinner" spin={true} pulse={true} />
  </DecoratedCenterLayout>
);

export const PageContainer: React.FunctionComponent<Props> = ({ page }) => {
  const [{ loading }, _dispatch] = useRedux(mapState);
  const { content, loading: loadingContent = defaultLoadingContent } = page;

  const finalContent = loading ? loadingContent : content;

  return <FullLayout>{finalContent}</FullLayout>;
};

function mapState(state: AppState) {
  const { loading } = state.routing;

  return {
    loading,
  };
}
