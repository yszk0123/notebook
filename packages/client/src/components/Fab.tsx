import { Button, Icon } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  name: string;
  onPress: () => void;
};

export const Fab: React.FunctionComponent<Props> = ({ name, onPress }) => {
  return (
    <Button rounded icon onPress={onPress} style={styles.fab}>
      <Icon name={name} />
    </Button>
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
});
