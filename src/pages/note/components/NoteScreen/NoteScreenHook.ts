import { GetProp, NoteScreenQuery, useNoteScreenQuery } from '../../../../GraphQLType';

interface Props {
  loading: boolean;
  notes: Note[];
}

// FIXME: Remove (#54)
type Note = GetProp<NoteScreenQuery, 'notes', 0>;
const loadingNotes: Note[] = [];

export function useNoteScreen(): Props {
  const { data, loading } = useNoteScreenQuery();
  const notes = (data && data.notes) || loadingNotes;

  return {
    loading,
    notes,
  };
}
