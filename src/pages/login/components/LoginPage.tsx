import React, { useRef } from 'react';
import { UseAuthUI } from '../../../application/UseAuthUI';
import { Text } from '../../../components/Text';

interface Props {
  useAuthUI: UseAuthUI;
}

export const LoginPage: React.FunctionComponent<Props> = ({ useAuthUI }) => {
  const ref = useRef<HTMLDivElement>(null);
  useAuthUI(ref);

  return (
    <>
      <Text>Login</Text>
      <div ref={ref} />
    </>
  );
};
