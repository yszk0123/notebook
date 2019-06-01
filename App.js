import 'firebase/app';
import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
// import 'normalize.css';
import './src/workaroundForReactNativeWeb';
import './src/workaroundForNativeBase';
import { AppRegistry } from 'react-native';
import { App } from './src/App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });

export default App;
