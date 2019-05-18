import { Button, Container, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useActions } from 'typeless';
import { CounterActions, getCounterState, useCounterModule } from '../CounterInterface';

interface Props {}

export const CounterScreen: React.FunctionComponent<Props> = () => {
  useCounterModule();

  const { count, loading } = getCounterState.useState();
  const { increment, incrementDelay, decrement } = useActions(CounterActions);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <View style={styles.wrapper}>
        <Text>Count: {count}</Text>
        <View style={styles.control}>
          <Button style={styles.button} onPress={increment}>
            <Text>Increment</Text>
          </Button>
          <Button style={styles.button} onPress={decrement}>
            <Text>Decrement</Text>
          </Button>
          <Button style={styles.button} onPress={incrementDelay}>
            <Text>Increment (delay)</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
  },
  display: {
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
