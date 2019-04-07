import { styled } from '../application/styled-components';
import { FontSize } from '../application/theme/Theme';

interface Props {
  bold?: boolean;
  size?: FontSize;
}

export const Text = styled.div<Props>`
  font-size: ${({ theme, size = FontSize.DEFAULT }) => theme.fontSize[size]};
  font-weight: ${({ theme, bold }) => (bold ? theme.fontWeight.bold : theme.fontWeight.normal)};
`;
