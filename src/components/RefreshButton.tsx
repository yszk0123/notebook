import { Button, Text } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

type Props = {
  refreshing: boolean;
  onPress: () => void;
};

export const RefreshButton: React.FunctionComponent<Props> = ({ refreshing, onPress }) => {
  return (
    <Button small transparent onPress={onPress} style={styles.button}>
      <ActivityIndicator hidesWhenStopped={false} animating={refreshing} />
      <Text>Refresh</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 16,
    left: 16,
    position: 'absolute',
  },
});
