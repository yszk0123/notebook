import { Body, Button, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';

export const DefaultHeader: React.FunctionComponent<{
  leftButtonText?: string;
  onPressLeftButton?: () => void;
  onPressRightButton?: () => void;
  rightButtonText?: string;
  title: string;
}> = ({ leftButtonText, onPressLeftButton, title, rightButtonText, onPressRightButton }) => {
  return (
    <Header>
      <Left>
        {onPressLeftButton && leftButtonText ? (
          <Button transparent onPress={onPressLeftButton}>
            <Text>{leftButtonText}</Text>
          </Button>
        ) : null}
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {onPressRightButton && rightButtonText ? (
          <Button transparent onPress={onPressRightButton}>
            <Text>{rightButtonText}</Text>
          </Button>
        ) : null}
      </Right>
    </Header>
  );
};
