import { Button, Container, Icon, ListItem, Text, Textarea } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { NoteContainer } from '../../NoteContainer';
import { useNoteEditScreen } from './NoteEditScreenHook';

const PADDING_BOTTOM = 200;

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export const NoteEditScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const noteId: number = navigation.getParam('noteId');
  const { loading } = useNoteEditScreen(noteId);
  const { text, onChangeText, onDelete, onUpdate } = NoteContainer.useContainer();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <ListItem>
        <Textarea
          autoFocus
          placeholder="Edit"
          rowSpan={6}
          value={text}
          onChangeText={onChangeText}
        />
      </ListItem>
      <ListItem>
        <Button danger onPress={() => onDelete(noteId)}>
          <Text>Delete</Text>
        </Button>
        <Button primary onPress={() => onUpdate(noteId)}>
          <Text>Update</Text>
        </Button>
      </ListItem>
    </Container>
  );
};
