import React, { useRef } from 'react';
import { useAuthUI } from '../../../app/useAuthUI';
import { Text } from '../../../components/Text';
import { FullLayout } from '../../../layouts/FullLayout';

interface Props {}

export const LoginPage: React.FunctionComponent<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);
  useAuthUI(ref);

  return (
    <FullLayout>
      <Text>Login</Text>
      <div ref={ref} />
    </FullLayout>
  );
};
