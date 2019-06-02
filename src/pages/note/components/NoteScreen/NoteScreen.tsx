import { Body, Button, Container, Icon, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { Note, useNoteScreen } from './NoteScreenHook';

const PADDING_BOTTOM = 200;

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
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
      <FlatList<Note>
        contentContainerStyle={styles.container}
        data={notes}
        keyExtractor={note => String(note.id)}
        renderItem={({ item: note }) => {
          return (
            <ListItem>
              <Body>
                <TouchableOpacity onPress={() => onSelectItem(note.id)}>
                  <Text>{note.text}</Text>
                  <Text note>{note.createdAt}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Button light onPress={() => onUpdate(note.id)}>
                  <Text>Update</Text>
                </Button>
                <Button danger onPress={() => onDelete(note.id)}>
                  <Text>Delete</Text>
                </Button>
              </Right>
            </ListItem>
          );
        }}
      />
      {/* <ScrollView contentContainerStyle={styles.container}>
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
      </ScrollView> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: PADDING_BOTTOM,
  },
});
