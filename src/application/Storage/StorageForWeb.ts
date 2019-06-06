import { Nullable } from '../utils/Maybe';
import { StorageInterface } from './StorageInterface';

export class Storage implements StorageInterface {
  public async getItem(key: string): Promise<Nullable<string>> {
    return window.localStorage.getItem(key);
  }

  public async setItem(key: string, value: string) {
    return window.localStorage.setItem(key, value);
  }

  public async removeItem(key: string) {
    return window.localStorage.removeItem(key);
  }
}
