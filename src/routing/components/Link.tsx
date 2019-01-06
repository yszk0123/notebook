import React, { useCallback, useContext } from 'react';
import { HistoryContext } from '../../app/HistoryContext';
import { styled } from '../../app/styled-components';
import { getCurrentPath } from '../utils/getCurrentPath';

const Anchor = styled.a`
  display: inline-block;
  text-decoration: none;
  color: currentColor;
  width: 100%;
  height: 100%;
`;

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
    <Anchor className={className} href={path} onClick={onClick}>
      {children}
    </Anchor>
  );
};
