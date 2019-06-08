import 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import './src/workaroundForReactNativeWeb';
import './src/workaroundForNativeBase';
import './src/workaroundForExpo';
import { AppRegistry, Platform } from 'react-native';
import { App } from './src/App';

AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('main', { rootTag: document.getElementById('root') });
}

export default App;
