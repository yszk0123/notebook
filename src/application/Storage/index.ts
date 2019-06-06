import { Platform } from 'react-native';
import { StorageInterface } from './StorageInterface';

export const Storage: StorageInterface = Platform.select({
  android: () => require('./StorageForNative').Storage,
  ios: () => require('./StorageForNative').Storage,
  web: () => require('./StorageForWeb').Storage,
})();
