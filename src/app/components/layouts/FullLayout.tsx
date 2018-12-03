import React from 'react';
import { GlobalNavigation } from '../../../routing/components/GlobalNavigation';
import { styled } from '../../../styled-components';
import { Main } from '../Main';

const VIRTUAL_KEYBOARD_HEIGHT = 216 + 48; // Ugly hack...

const FullLayoutWrapper = styled.div<{ isVirtualKeyboardVisible?: boolean }>`
  position: fixed;
  width: 100%;
  height: calc(var(--hack-vh, 1vh) * 100);
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;

  @media screen and (max-width: 480px) {
    height: ${({ isVirtualKeyboardVisible }) =>
      isVirtualKeyboardVisible
        ? `calc(var(--hack-vh, 1vh) * 100 - ${VIRTUAL_KEYBOARD_HEIGHT}px)`
        : 'calc(var(--hack-vh, 1vh) * 100)'};
  }
`;

const StyledMain = styled(Main)`
  position: relative;
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.headerHeight}px);
  top: ${({ theme }) => theme.headerHeight}px;
`;

interface Props {
  isVirtualKeyboardVisible?: boolean;
}

export const FullLayout: React.FunctionComponent<Props> = ({
  children,
  isVirtualKeyboardVisible: isVirtualKeyboardVisible,
}) => {
  return (
    <FullLayoutWrapper isVirtualKeyboardVisible={isVirtualKeyboardVisible}>
      <GlobalNavigation />
      <StyledMain>{children}</StyledMain>
    </FullLayoutWrapper>
  );
};
