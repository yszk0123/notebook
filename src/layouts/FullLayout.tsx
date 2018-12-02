import { styled } from '../styled-components';

const VIRTUAL_KEYBOARD_HEIGHT = 216; // Ugly hack...

export const FullLayout = styled.div<{ focused?: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;

  @media screen and (max-width: 480px) {
    height: ${({ focused }) =>
      focused ? `calc(100vh - ${VIRTUAL_KEYBOARD_HEIGHT}px)` : '100vh'};
  }
`;
