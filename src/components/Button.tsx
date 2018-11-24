import { styled } from '../styled-components';

export const Button = styled.button`
  background: ${({ theme }) => theme.buttonColorBg};
  border-radius: 4px;
  border: none;
  color: ${({ theme }) => theme.buttonColorFg};
  padding: ${({ theme }) => theme.space}px;
`;
