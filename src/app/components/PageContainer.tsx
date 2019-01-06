import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '../../components/Icon';
import { Page, RoutingGlobalState } from '../../routing/routing-type';
import { styled } from '../../styled-components';
import { CenterLayout } from './layouts/CenterLayout';
import { FullLayout } from './layouts/FullLayout';

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

const PageContainerInner: React.FunctionComponent<Props> = ({
  page,
  loading,
}) => {
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

export const PageContainer = connect(mapState)(PageContainerInner);
