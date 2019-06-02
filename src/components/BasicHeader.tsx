import { Body, Button, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { useAuth } from '../Bootstrap';

type Props = {
  title: string;
};

export const BasicHeader: React.FunctionComponent<Props> = ({ title }) => {
  const { logout } = useAuth();

  return (
    <Header>
      <Left />
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button onPress={logout}>
          <Text>Logout</Text>
        </Button>
      </Right>
    </Header>
  );
};
