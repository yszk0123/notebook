import React from 'react';
import { Apollo } from './Apollo';
import { Loader } from './Loader';

type Props = {};

export const Bootstrap: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Loader>
      <Apollo>{children}</Apollo>
    </Loader>
  );
};
