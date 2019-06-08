import { useCallback, useState } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { GetProp, NoteScreenQuery, useNoteScreenQuery } from '../../../../GraphQLType';
import { NoteRoute } from '../../NoteConstant';

interface Props {
  loading: boolean;
  refreshing: boolean;
  notes: Note[];
  onEdit: (noteId: number) => void;
  onInsert: () => void;
  onRefresh: () => void;
}

// FIXME: Remove (#54)
export type Note = GetProp<NoteScreenQuery, 'notes', 0>;
const loadingNotes: Note[] = [];

export function useNoteScreen(navigation: NavigationScreenProp<NavigationState>): Props {
  const { data, loading, refetch } = useNoteScreenQuery();
  const notes = (data && data.notes) || loadingNotes;
  const [refreshing, setRefreshing] = useState(false);

  const onEdit = useCallback(
    (noteId: number) => {
      navigation.navigate(NoteRoute.NOTE_EDIT, { noteId });
    },
    [navigation],
  );

  const onInsert = useCallback(() => {
    navigation.navigate(NoteRoute.NOTE_INSERT);
  }, [navigation]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {
    loading,
    notes,
    onEdit,
    onInsert,
    onRefresh,
    refreshing,
  };
}
