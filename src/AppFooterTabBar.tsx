import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { useCallback } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { GlobalFooterTabRouteName } from './global/constants/GlobalRoutingConstant';

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export const AppFooterTabBar: React.FunctionComponent<Props> = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  const onPressHome = useCallback(() => {
    navigation.navigate(GlobalFooterTabRouteName.HOME);
  }, [navigation]);
  const onPressCounter = useCallback(() => {
    navigation.navigate(GlobalFooterTabRouteName.NOTE);
  }, [navigation]);
  const onPressProfile = useCallback(() => {
    navigation.navigate(GlobalFooterTabRouteName.PROFILE);
  }, [navigation]);

  return (
    <Footer>
      <FooterTab>
        <Button
          vertical={true}
          active={routeName === GlobalFooterTabRouteName.HOME}
          onPress={onPressHome}
        >
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical={true}
          active={routeName === GlobalFooterTabRouteName.NOTE}
          onPress={onPressCounter}
        >
          <Icon name="cube" />
          <Text>Counter</Text>
        </Button>
        <Button
          vertical={true}
          active={routeName === GlobalFooterTabRouteName.PROFILE}
          onPress={onPressProfile}
        >
          <Icon name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
