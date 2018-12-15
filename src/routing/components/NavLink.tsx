import React, { useContext } from 'react';
import { Text } from '../../components/Text';
import { HistoryContext } from '../../HistoryContext';
import { styled } from '../../styled-components';
import { getCurrentPath } from '../utils/getCurrentPath';
import { Link } from './Link';

const DecoratedLink = styled(Link)`
  text-decoration: none;
  color: currentColor;
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
    <DecoratedLink className={className} path={path}>
      <Text bold={currentPath === path}>{children}</Text>
    </DecoratedLink>
  );
};
