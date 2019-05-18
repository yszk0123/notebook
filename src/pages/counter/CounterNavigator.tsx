import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from './components/BasicHeader';
import { CounterScreen } from './components/CounterScreen';

export const CounterNavigator = createStackNavigator(
  {
    Counter: {
      navigationOptions: {
        header: () => <BasicHeader title="counter" />,
      },
      screen: CounterScreen,
    },
  },
  {
    initialRouteName: 'Counter',
  },
);
