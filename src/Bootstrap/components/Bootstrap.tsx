import React from 'react';
import { Auth } from './Auth';
import { Loader } from './Loader';

type Props = {};

export const Bootstrap: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Loader>
      <Auth>{children}</Auth>
    </Loader>
  );
};
