import { format } from 'date-fns';
import { Body, Button, Container, Content, Icon, ListItem, Right, Text } from 'native-base';
import React, { useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { DefaultHeader } from '../../../../components/DefaultHeader';
import { LoadingPage } from '../../../../components/LoadingPage';
import { RefreshButton } from '../../../../components/RefreshButton';
import { Note, useNoteScreen } from './NoteScreenHook';

const PADDING_BOTTOM = 200;

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

type NoteItemProps = {
  onEdit: (noteId: number) => void;
  note: Note;
};
const NoteItem: React.FunctionComponent<NoteItemProps> = ({ onEdit, note }) => {
  const createdAt = useMemo(() => format(note.createdAt, 'YYYY/MM/DD hh:mm'), [note]);

  return (
    <ListItem onPress={() => onEdit(note.id)}>
      <Body>
        <Text>{note.text}</Text>
      </Body>
      <Right>
        <Text note>{createdAt}</Text>
      </Right>
    </ListItem>
  );
};

type FabProps = {
  name: string;
  onPress: () => void;
};
const Fab: React.FunctionComponent<FabProps> = ({ name, onPress }) => {
  return (
    <Button rounded icon onPress={onPress} style={styles.fab}>
      <Icon name={name} />
    </Button>
  );
};

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
export const NoteScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const { loading, refreshing, notes, onRefresh, onEdit, onInsert } = useNoteScreen(navigation);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <DefaultHeader title="Note" rightButtonText="Insert" onPressRightButton={onInsert} />
      <Content>
        <FlatList<Note>
          contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={notes}
          keyExtractor={note => String(note.id)}
          renderItem={({ item: note }) => <NoteItem note={note} onEdit={onEdit} />}
        />
      </Content>
      <RefreshButton refreshing={refreshing} onPress={onRefresh} />
      <Fab name="add" onPress={onInsert} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: PADDING_BOTTOM,
  },
  fab: {
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
});
