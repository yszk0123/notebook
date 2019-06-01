import { Container, Text } from 'native-base';
import React from 'react';

interface Props {}

export const LoadingPage: React.FunctionComponent<Props> = () => {
  return (
    <Container>
      <Text>Loading...</Text>
    </Container>
  );
};
