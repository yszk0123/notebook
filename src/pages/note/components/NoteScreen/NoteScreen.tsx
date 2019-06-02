import { Body, Button, Container, Icon, Left, ListItem, Right, Text, Textarea } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  // @ts-ignore
  SwipeableFlatList,
  TouchableOpacity,
} from 'react-native';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { Note, useNoteScreen } from './NoteScreenHook';

const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name="text" />
);

interface Props {}

export const NoteScreen: React.FunctionComponent<Props> = () => {
  const {
    loading,
    notes,
    onChangeText,
    onDelete,
    onInsert,
    onSelectItem,
    onUpdate,
    text,
  } = useNoteScreen();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <SwipeableFlatList
        data={notes}
        keyExtractor={(note: Note) => String(note.id)}
        maxSwipeDistance={200}
        renderQuickActions={({ item: note }: { item: Note }) => {
          return (
            <ListItem style={styles.actionsContainer}>
              <Button light onPress={() => onUpdate(note.id)}>
                <Text>Update</Text>
              </Button>
              <Button danger onPress={() => onDelete(note.id)}>
                <Text>Delete</Text>
              </Button>
            </ListItem>
          );
        }}
        renderItem={({ item: note }: { item: Note }) => {
          return (
            <ListItem style={styles.itemContainer}>
              <TouchableOpacity onPress={() => onSelectItem(note.id)}>
                <Text>{note.text}</Text>
              </TouchableOpacity>
            </ListItem>
          );
        }}
      />
      <ListItem>
        <Left>
          <LargeIcon name="text" />
        </Left>
        <Body>
          <Textarea rowSpan={4} placeholder="New Item" value={text} onChangeText={onChangeText} />
        </Body>
        <Right>
          <Button onPress={onInsert}>
            <Text>Insert</Text>
          </Button>
        </Right>
      </ListItem>
    </Container>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemContainer: {
    backgroundColor: 'white',
  },
});
