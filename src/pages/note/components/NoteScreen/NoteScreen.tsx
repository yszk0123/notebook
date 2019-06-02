import { Body, Button, Container, Input, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { LoadingPage } from '../../../../components/LoadingPage';
import { useNoteScreen } from './NoteScreenHook';

interface Props {}

export const NoteScreen: React.FunctionComponent<Props> = () => {
  const { notes, loading, onChangeText, onInsert, onUpdate, text } = useNoteScreen();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <ScrollView>
        {notes.map(note => {
          return (
            <ListItem key={note.id}>
              <Body>
                <Text>{note.text}</Text>
              </Body>
              <Right>
                <Button onPress={() => onUpdate(note.id)}>
                  <Text>Update</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })}
        <ListItem>
          <Body>
            <Input value={text} onChangeText={onChangeText} />
          </Body>
          <Right>
            <Button onPress={onInsert}>
              <Text>Insert</Text>
            </Button>
          </Right>
        </ListItem>
      </ScrollView>
    </Container>
  );
};
