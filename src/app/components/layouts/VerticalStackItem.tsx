import { styled } from '../../../styled-components';

interface Props {
  autoScale?: boolean;
}

export const VerticalStackItem = styled.div<Props>`
  flex-grow: ${({ autoScale }) => (autoScale ? 1 : undefined)};
  height: 100%;
  overflow-y: hidden;
  position: relative;
`;
