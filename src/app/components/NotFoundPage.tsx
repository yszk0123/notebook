import React from 'react';
import { Text } from '../../components/Text';
import { FullLayout } from './layouts/FullLayout';

interface Props {}

export const NotFoundPage: React.FunctionComponent<Props> = () => {
  return (
    <FullLayout>
      <Text>Not Found</Text>
    </FullLayout>
  );
};
