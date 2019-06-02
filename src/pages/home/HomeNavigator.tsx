import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from '../../components/BasicHeader';
import { HomeScreen } from './components/HomeScreen';

export const HomeNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        header: <BasicHeader title="Home" />,
      },
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
