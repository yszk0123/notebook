import { styled } from '../../../application/styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;

  & + & {
    margin-top: ${({ theme }) => theme.space};
    border-top: 1px solid ${({ theme }) => theme.borderColorBg};
    padding-top: ${({ theme }) => theme.space};
  }
`;
