import { Nullable } from '../utils/Maybe';

export class Storage {
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
