import { Alert } from 'react-native';

export async function alert(message: string): Promise<boolean> {
  return new Promise(resolve => {
    Alert.alert(
      'alert',
      message,
      [
        { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
        { text: 'OK', onPress: () => resolve(true), style: 'destructive' },
      ],
      { cancelable: false },
    );
  });
}
