import { Container, Icon, ListItem, Text } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { LoadingPage } from '../../../../components/LoadingPage';
import { Note, useNoteScreen } from './NoteScreenHook';

const PADDING_BOTTOM = 200;

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export const NoteScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const { loading, notes, onEdit } = useNoteScreen(navigation);

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
              <TouchableOpacity onPress={() => onEdit(note.id)}>
                <Text>{note.text}</Text>
                <Text note>{note.createdAt}</Text>
              </TouchableOpacity>
            </ListItem>
          );
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: PADDING_BOTTOM,
  },
});
