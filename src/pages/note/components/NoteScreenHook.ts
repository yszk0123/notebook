import { NoteScreenQuery, useNoteScreenQuery } from '../../../GraphQLType';

interface Props {
  loading: boolean;
  notes: Notes;
}

// FIXME: Remove (#54)
type Notes = NonNullable<NoteScreenQuery['notes']>;
const loadingNotes: Notes = [];

export function useNoteScreen(): Props {
  const { data, loading } = useNoteScreenQuery();
  const notes = (data && data.notes) || loadingNotes;

  return {
    loading,
    notes,
  };
}
