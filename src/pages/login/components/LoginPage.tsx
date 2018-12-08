import React, { useRef } from 'react';
import { useAuthUI } from '../../../app/useAuthUI';
import { Text } from '../../../components/Text';

interface Props {}

export const LoginPage: React.FunctionComponent<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);
  useAuthUI(ref);

  return (
    <>
      <Text>Login</Text>
      <div ref={ref} />
    </>
  );
};
