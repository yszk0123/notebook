import { styled } from '../../../styled-components';

const VIRTUAL_KEYBOARD_HEIGHT = 216 + 48; // Ugly hack...

export const VirtualKeyboardSpacer = styled.div<{
  isVirtualKeyboardVisible?: boolean;
}>`
  display: none;

  @media screen and (max-width: 480px) {
    display: ${({ isVirtualKeyboardVisible }) =>
      isVirtualKeyboardVisible ? 'block' : undefined};
    height: ${({ isVirtualKeyboardVisible }) =>
      isVirtualKeyboardVisible
        ? `calc(100% - ${VIRTUAL_KEYBOARD_HEIGHT}px)`
        : undefined};
  }
`;
