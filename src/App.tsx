import { Body, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { DefaultTypelessProvider } from 'typeless';
import { AppFooterTabBar } from './AppFooterTabBar';
import { appConfig } from './config/AppConfig';
import { GlobalFooterTabRouteName } from './global/constants/GlobalRoutingConstant';
import { Loader } from './Loader';
import { CounterNavigator } from './pages/counter';

// import { bootstrap } from './Bootstrap';
// import { registerFontAwesome } from './registerFontAwesome';

// registerFontAwesome();
// hackForMobile();
// bootstrap().catch(printError);

type HomeScreenProps = {};

const HomeScreen: React.FunctionComponent<HomeScreenProps> = () => {
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

const HomeNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        header: () => <HomeHeader />,
      },
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: GlobalFooterTabRouteName.HOME,
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Counter: CounterNavigator,
    Home: HomeNavigator,
  },
  {
    initialRouteName: GlobalFooterTabRouteName.HOME,
    tabBarComponent: AppFooterTabBar,
    tabBarPosition: 'bottom',
  },
);

const AppContainer = createAppContainer(AppNavigator);

type Props = {};

export const App: React.FunctionComponent<Props> = () => {
  return (
    <Loader>
      <DefaultTypelessProvider>
        <AppContainer />
      </DefaultTypelessProvider>
    </Loader>
  );
};
