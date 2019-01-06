import React from 'react';
import { GlobalNavigation } from '../../../routing/components/GlobalNavigation';
import { GlobalNavigationSpacer } from '../../../routing/components/GlobalNavigationSpacer';
import { styled } from '../../styled-components';

const FullLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--hack-vh, 1vh) * 100);
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const MainLayout = styled.main`
  flex-grow: 1;
  height: 100%;
  overflow-y: hidden;
  position: relative;
  width: 100%;
`;

interface Props {}

export const FullLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <FullLayoutWrapper>
      <GlobalNavigation />
      <GlobalNavigationSpacer />
      <MainLayout>{children}</MainLayout>
    </FullLayoutWrapper>
  );
};
