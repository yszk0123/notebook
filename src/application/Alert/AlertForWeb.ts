import { Platform } from 'react-native';

export async function alert(message: string): Promise<boolean> {
  if (Platform.OS !== 'web') {
    return true;
  }
  return confirm(message);
}
