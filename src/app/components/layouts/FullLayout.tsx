import React from 'react';
import { GlobalNavigation } from '../../../routing/components/GlobalNavigation';
import { styled } from '../../../styled-components';
import { Main } from '../Main';

const FullLayoutWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: calc(var(--hack-vh, 1vh) * 100);
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
`;

const StyledMain = styled(Main)`
  position: relative;
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.headerHeight}px);
  top: ${({ theme }) => theme.headerHeight}px;
`;

interface Props {}

export const FullLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <FullLayoutWrapper>
      <GlobalNavigation />
      <StyledMain>{children}</StyledMain>
    </FullLayoutWrapper>
  );
};
