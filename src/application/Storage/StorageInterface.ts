import { Nullable } from '../utils/Maybe';

export interface StorageInterface {
  getItem(key: string): Promise<Nullable<string>>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
