import { styled } from '../application/styled-components';

export const Button = styled.button`
  background: ${({ theme }) => theme.buttonColorBg};
  border-radius: 4px;
  border: none;
  color: ${({ theme }) => theme.buttonColorFg};
  cursor: pointer;
  outline: none;
  padding: ${({ theme }) => theme.space};
`;
