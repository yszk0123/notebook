import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from '../../components/BasicHeader';
import { ProfileScreen } from './components/ProfileScreen';

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      navigationOptions: {
        header: () => <BasicHeader title="Profile" />,
      },
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Profile',
  },
);
