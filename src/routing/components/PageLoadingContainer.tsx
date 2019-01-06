import React from 'react';
import { connect } from 'react-redux';
import { CenterLayout } from '../../app/components/layouts/CenterLayout';
import { FullLayout } from '../../app/components/layouts/FullLayout';
import { styled } from '../../app/styled-components';
import { Icon } from '../../components/Icon';
import { Page, RoutingGlobalState } from '../routing-type';

interface Props {
  page: Page;
  loading: boolean;
}

const Center = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

const defaultLoadingContent = (
  <Center>
    <Icon icon="spinner" spin={true} pulse={true} />
  </Center>
);

const PageLoading: React.FunctionComponent<Props> = ({ page, loading }) => {
  const { content, loading: loadingContent = defaultLoadingContent } = page;

  const finalContent = loading ? loadingContent : content;

  return <FullLayout>{finalContent}</FullLayout>;
};

interface State extends RoutingGlobalState {}

function mapState(state: State) {
  const { loading } = state.routing;

  return {
    loading,
  };
}

export const PageLoadingContainer = connect(mapState)(PageLoading);
