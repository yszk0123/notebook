declare module 'expo';

declare module 'react-navigation' {
  interface NavigationContainer {
    navigationOptions: {
      tabBarLabel: string;
      tabBarIcon: React.FunctionComponent<{ focused: boolean }>;
    };
  }
}
