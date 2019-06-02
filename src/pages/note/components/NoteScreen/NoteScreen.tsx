import { Container, ListItem, Text } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { LoadingPage } from '../../../../components/LoadingPage';
import { useNoteScreen } from './NoteScreenHook';

interface Props {}

export const NoteScreen: React.FunctionComponent<Props> = () => {
  const { notes, loading } = useNoteScreen();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <ScrollView>
        {notes.map(note => {
          return (
            <ListItem key={note.id}>
              <Text>{note.text}</Text>
            </ListItem>
          );
        })}
      </ScrollView>
    </Container>
  );
};
