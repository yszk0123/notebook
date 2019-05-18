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
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { noop } from './application/utils/noop';
import { appConfig } from './config/AppConfig';
import { Loader } from './Loader';

// import { bootstrap } from './Bootstrap';
// import { registerFontAwesome } from './registerFontAwesome';

// registerFontAwesome();
// hackForMobile();
// bootstrap().catch(printError);

type Props = {};

const HomeScreen: React.FunctionComponent<Props> = () => {
  return (
    <Container>
      <Content>
        <Text>Hello</Text>
      </Content>
    </Container>
  );
};

const HomeHeader: React.FunctionComponent<{}> = () => {
  return (
    <Header>
      <Left />
      <Body>
        <Title>{appConfig.title}</Title>
      </Body>
      <Right>
        <Icon name="menu" />
      </Right>
    </Header>
  );
};

const HomeStack = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        header: () => <HomeHeader />,
      },
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const FooterTabBar: React.FunctionComponent<{}> = () => {
  return (
    <Footer>
      <FooterTab>
        <Button vertical={true} active={true} onPress={noop}>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical={true} active={false} onPress={noop}>
          <Icon name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: FooterTabBar,
    tabBarPosition: 'bottom',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export const App: React.FunctionComponent<{}> = () => {
  return (
    <Loader>
      <AppContainer />
    </Loader>
  );
};
