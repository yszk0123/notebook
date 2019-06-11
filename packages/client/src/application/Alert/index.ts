import { Platform } from 'react-native';
import { Alert } from './AlertType';

export const alert: Alert = Platform.select({
  android: () => require('./AlertForNative'),
  ios: () => require('./AlertForNative'),
  web: () => require('./AlertForWeb'),
})().alert;
