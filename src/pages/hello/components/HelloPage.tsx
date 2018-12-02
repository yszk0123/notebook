import React from 'react';
import { FullLayout } from '../../../app/components/layouts/FullLayout';
import { Text } from '../../../components/Text';

interface Props {}

export const HelloPage: React.FunctionComponent<Props> = () => {
  return (
    <FullLayout>
      <Text>Hello</Text>
    </FullLayout>
  );
};
