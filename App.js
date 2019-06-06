import 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import './src/workaroundForReactNativeWeb';
import './src/workaroundForNativeBase';
import { AppRegistry } from 'react-native';
import { App } from './src/App';

AppRegistry.registerComponent('main', () => App);

export default App;
