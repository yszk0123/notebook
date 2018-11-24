import { styled } from '../styled-components';
import { FontSize } from '../theme/theme-type';

interface Props {
  bold?: boolean;
  size?: FontSize;
}

export const Text = styled.div<Props>`
  font-size: ${({ theme, size = FontSize.DEFAULT }) => theme.fontSize[size]};
  font-weight: ${({ theme, bold }) =>
    bold ? theme.fontWeight.bold : theme.fontWeight.normal};
`;
