import React, { useContext } from 'react';
import { HistoryContext } from '../../app/HistoryContext';
import { Text } from '../../components/Text';
import { getCurrentPath } from '../utils/getCurrentPath';
import { Link } from './Link';

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
    <Link className={className} path={path}>
      <Text bold={currentPath === path}>{children}</Text>
    </Link>
  );
};
