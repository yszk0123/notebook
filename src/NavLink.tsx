import React, { useContext } from 'react';
import { HistoryContext } from './HistoryContext';
import { Link } from './Link';
import { styled } from './styled-components';
import { Text } from './Text';
import { getCurrentPath } from './utils/getCurrentPath';

const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.headerColorFg};

  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

interface Props {
  className?: string;
  path: string;
}

export const NavLink: React.FunctionComponent<Props> = ({
  className,
  children,
  path,
}) => {
  const history = useContext(HistoryContext);
  if (!history) {
    throw new Error('history must be provided');
  }
  const currentPath = getCurrentPath(history);

  return (
    <StyledNavLink className={className} path={path}>
      <Text bold={currentPath === path}>{children}</Text>
    </StyledNavLink>
  );
};
