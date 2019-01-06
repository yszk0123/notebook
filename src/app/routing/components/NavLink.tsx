import React, { useContext } from 'react';
import { Text } from '../../../components/Text';
import { HistoryContext } from '../../HistoryContext';
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
