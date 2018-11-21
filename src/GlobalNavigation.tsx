import React from 'react';
import { styled } from './styled-components';

const StyledGlobalNavigation = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.headerColorBg};
  color: ${({ theme }) => theme.headerColorFg};
  font-size: ${({ theme }) => theme.fontSize.large};
  padding: ${({ theme }) => theme.space}px;
`;

const Left = styled.div`
  display: flex;
  margin: 0;
`;

const Icon = styled.div`
  margin: 0 ${({ theme }) => theme.space}px;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 100px;
`;

const Item = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

interface Props {}

export const GlobalNavigation: React.FunctionComponent<Props> = () => {
  return (
    <StyledGlobalNavigation>
      <Left>
        <Item>
          <Icon>Icon</Icon>
        </Item>
        <Item>A</Item>
        <Item>B</Item>
      </Left>
      <Right>C</Right>
    </StyledGlobalNavigation>
  );
};
