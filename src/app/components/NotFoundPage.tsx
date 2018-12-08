import React from 'react';
import { Text } from '../../components/Text';
import { Center } from './layouts/Center';

interface Props {}

export const NotFoundPage: React.FunctionComponent<Props> = () => {
  return (
    <Center>
      <Text>Not Found</Text>
    </Center>
  );
};
