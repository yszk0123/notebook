import { Body, Button, Container, Icon, Left, ListItem, Right, Text, Textarea } from 'native-base';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { useNoteScreen } from './NoteScreenHook';

const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name="text" />
);

interface Props {}

export const NoteScreen: React.FunctionComponent<Props> = () => {
  const { notes, loading, onSelectItem, onChangeText, onInsert, onUpdate, text } = useNoteScreen();

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
                <TouchableOpacity onPress={() => onSelectItem(note.id)}>
                  <Text>{note.text}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Button light onPress={() => onUpdate(note.id)}>
                  <Text>Update</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })}
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
      </ScrollView>
    </Container>
  );
};
