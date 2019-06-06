import { AsyncStorage } from 'react-native';
import { Nullable } from '../utils/Maybe';
import { StorageInterface } from './StorageInterface';

export class Storage implements StorageInterface {
  public async getItem(key: string): Promise<Nullable<string>> {
    return AsyncStorage.getItem(key);
  }

  public async setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  public async removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }
}
