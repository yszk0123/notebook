import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { AppFooterTabBar } from './AppFooterTabBar';
import { Bootstrap } from './Bootstrap';
import { GlobalFooterTabRouteName } from './global/constants/GlobalRoutingConstant';
import { HomeNavigator } from './pages/home';
import { NoteNavigator } from './pages/note';
import { ProfileNavigator } from './pages/profile';

const AppNavigator = createBottomTabNavigator(
  {
    [GlobalFooterTabRouteName.NOTE]: NoteNavigator,
    [GlobalFooterTabRouteName.HOME]: HomeNavigator,
    [GlobalFooterTabRouteName.PROFILE]: ProfileNavigator,
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
    <Bootstrap>
      <AppContainer />
    </Bootstrap>
  );
};
