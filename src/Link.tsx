import React, { useCallback, useContext } from 'react';
import { HistoryContext } from './HistoryContext';
import { getCurrentPath } from './utils/getCurrentPath';

interface Props {
  className?: string;
  path: string;
}

export const Link: React.FunctionComponent<Props> = ({
  className,
  children,
  path,
}) => {
  const history = useContext(HistoryContext);
  if (!history) {
    throw new Error('history must be provided');
  }

  const onClick = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();

      const currentPath = getCurrentPath(history);
      if (path === currentPath) {
        return;
      }

      history.push(path);
    },
    [path],
  );

  return (
    <a className={className} href={path} onClick={onClick}>
      {children}
    </a>
  );
};
