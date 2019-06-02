import { createSwitchNavigator } from 'react-navigation';
import { HomeScreen } from './components/HomeScreen';

export const HomeNavigator = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
