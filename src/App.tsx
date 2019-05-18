import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import { appConfig } from './config/AppConfig';
import { Loader } from './Loader';

// import { bootstrap } from './Bootstrap';
// import { registerFontAwesome } from './registerFontAwesome';

// registerFontAwesome();
// hackForMobile();
// bootstrap().catch(printError);

type Props = {};

const Inner: React.FunctionComponent<Props> = () => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>{appConfig.title}</Title>
        </Body>
        <Right>
          <Icon name="menu" />
        </Right>
      </Header>
      <Content>
        <Text>Hello</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button full={true}>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export const App: React.FunctionComponent<{}> = () => {
  return (
    <Loader>
      <Inner />
    </Loader>
  );
};
