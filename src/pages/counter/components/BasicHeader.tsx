import { Body, Header, Left, Right, Title } from 'native-base';
import React from 'react';

type Props = {
  title: string;
};

export const BasicHeader: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <Header>
      <Left />
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};
