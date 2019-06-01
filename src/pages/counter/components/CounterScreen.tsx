import { Button, Container, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LoadingPage } from '../../../components/LoadingPage';
import { useCounterScreen } from './CounterScreenHook';

interface Props {}

export const CounterScreen: React.FunctionComponent<Props> = () => {
  const { count, loading, onIncrement, onDecrement } = useCounterScreen();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <View style={styles.wrapper}>
        <Text>Count: {count}</Text>
        <View style={styles.control}>
          <Button style={styles.button} onPress={onIncrement}>
            <Text>Increment</Text>
          </Button>
          <Button style={styles.button} onPress={onDecrement}>
            <Text>Decrement</Text>
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
