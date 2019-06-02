import { useCallback, useEffect } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { isNotNull, Nullable } from '../../../../application/utils/Maybe';
import { GetProp, NoteEditScreenQuery, useNoteEditScreenQuery } from '../../../../GraphQLType';
import { NoteRoute } from '../../NoteConstant';
import { NoteContainer } from '../../NoteContainer';

interface Props {
  loading: boolean;
  note: Nullable<Note>;
  text: string;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressDelete: (id: number) => void;
  onPressUpdate: (id: number) => void;
}

// FIXME: Remove (#54)
export type Note = GetProp<NoteEditScreenQuery, 'notes', 0>;
const loadingNotes: Note[] = [];

export function useNoteEditScreen(
  noteId: number,
  navigation: NavigationScreenProp<NavigationState>,
): Props {
  const { data, loading } = useNoteEditScreenQuery({ variables: { id: noteId } });
  const { text, onChangeText, onDelete, onUpdate } = NoteContainer.useContainer();

  const notes = (data && data.notes) || loadingNotes;
  const note = notes.length ? notes[0] : null;

  const onPressCancel = useCallback(() => {
    navigation.navigate(NoteRoute.NOTE);
  }, [navigation]);

  const onPressUpdate = useCallback(
    (id: number) => {
      onUpdate(id);
      navigation.navigate(NoteRoute.NOTE);
    },
    [onUpdate, navigation],
  );

  const onPressDelete = useCallback(
    (id: number) => {
      if (confirm('This operation cannot be undone')) {
        onDelete(id);
        navigation.navigate(NoteRoute.NOTE);
      }
    },
    [onDelete],
  );

  useEffect(() => {
    if (isNotNull(note)) {
      onChangeText(note.text);
    }
  }, [note]);

  return {
    loading,
    note,
    onChangeText,
    onPressCancel,
    onPressDelete,
    onPressUpdate,
    text,
  };
}
