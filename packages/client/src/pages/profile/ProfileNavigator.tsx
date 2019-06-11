import { createSwitchNavigator } from 'react-navigation';
import { ProfileScreen } from './components/ProfileScreen';

export const ProfileNavigator = createSwitchNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Profile',
  },
);
