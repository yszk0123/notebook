import { Button, Container, Content, Icon, ListItem, Text, Textarea } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { NoteHeader } from '../NoteHeader';
import { useNoteEditScreen } from './NoteEditScreenHook';

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export const NoteEditScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const noteId: number = navigation.getParam('noteId');
  const {
    loading,
    text,
    onChangeText,
    onPressCancel,
    onPressDelete,
    onPressUpdate,
  } = useNoteEditScreen(noteId, navigation);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <NoteHeader
        title="NoteEdit"
        leftButtonText="Cancel"
        onPressLeftButton={onPressCancel}
        rightButtonText="Update"
        onPressRightButton={() => onPressUpdate(noteId)}
      />
      <Content>
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
          <Button danger onPress={() => onPressDelete(noteId)}>
            <Text>Delete</Text>
          </Button>
        </ListItem>
      </Content>
    </Container>
  );
};
