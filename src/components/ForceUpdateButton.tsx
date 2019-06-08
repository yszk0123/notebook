import { Updates } from 'expo';
import { Button, Text } from 'native-base';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

type Props = {};

export const ForceUpdateButton: React.FunctionComponent<Props> = () => {
  const onPress = useCallback(() => {
    Updates.reload();
  }, []);

  return (
    <Button small transparent onPress={onPress} style={styles.button}>
      <Text>Force Update</Text>
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
