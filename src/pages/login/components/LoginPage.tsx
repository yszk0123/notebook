import React, { useRef } from 'react';
import { FullLayout } from '../../../app/components/layouts/FullLayout';
import { useAuthUI } from '../../../app/useAuthUI';
import { Text } from '../../../components/Text';

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
