import { Button, Container, Content, ListItem, Text, View } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LoadingPage } from '../../../../components/LoadingPage';
import { LogoutHeader } from '../../../../components/LogoutHeader';
import { RefreshButton } from '../../../../components/RefreshButton';
import { useHomeScreen } from './HomeScreenHook';

interface Props {}

export const HomeScreen: React.FunctionComponent<Props> = () => {
  const {
    count,
    loading,
    notes,
    onDecrement,
    onIncrement,
    onRefresh,
    refreshing,
  } = useHomeScreen();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <LogoutHeader title="Home" />
      <Content contentContainerStyle={styles.wrapper}>
        <Text>Count: {count}</Text>
        <View style={styles.control}>
          <Button style={styles.button} onPress={onIncrement}>
            <Text>Increment</Text>
          </Button>
          <Button style={styles.button} onPress={onDecrement}>
            <Text>Decrement</Text>
          </Button>
        </View>
        <ScrollView>
          {notes.map(note => {
            return (
              <ListItem key={note.id}>
                <Text>{note.text}</Text>
              </ListItem>
            );
          })}
        </ScrollView>
      </Content>
      <RefreshButton refreshing={refreshing} onPress={onRefresh} />
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
