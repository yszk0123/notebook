import { Nullable } from '../utils/Maybe';

export interface StorageInterface {
  new (): this;
  getItem(_key: string): Promise<Nullable<string>>;
  setItem(_key: string, _value: string): Promise<void>;
  removeItem(_key: string): Promise<void>;
}
