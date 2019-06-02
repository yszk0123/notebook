import { useCallback, useState } from 'react';
import { GetProp, NoteScreenQuery, useNoteScreenQuery } from '../../../../GraphQLType';
import {
  NoteScreenDocument,
  useInsertNoteMutation,
  useUpdateNoteMutation,
} from '../../../../__generated__/GraphQLOperations';

interface Props {
  loading: boolean;
  notes: Note[];
  text: string;
  onChangeText: (text: string) => void;
  onInsert: () => void;
  onUpdate: (id: number) => void;
}

// FIXME: Remove (#54)
type Note = GetProp<NoteScreenQuery, 'notes', 0>;
const loadingNotes: Note[] = [];

export function useNoteScreen(): Props {
  const { data, loading } = useNoteScreenQuery();
  const [text, setText] = useState('');
  const notes = (data && data.notes) || loadingNotes;
  const insertNote = useInsertNoteMutation({
    update(cache, { data: newData }) {
      const oldData = cache.readQuery<NoteScreenQuery>({ query: NoteScreenDocument })!;
      const newNotes = newData!.insert_notes!.returning!;

      cache.writeQuery<NoteScreenQuery>({
        data: {
          ...oldData,
          notes: [...oldData.notes, ...newNotes],
        },
        query: NoteScreenDocument,
      });
    },
  });
  const updateNote = useUpdateNoteMutation();

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const onInsert = useCallback(() => {
    insertNote({ variables: { input: { text } } });
  }, [insertNote, text]);

  const onUpdate = useCallback(
    (id: number) => {
      updateNote({ variables: { id, input: { text } } });
    },
    [updateNote, text],
  );

  return {
    loading,
    notes,
    onChangeText,
    onInsert,
    onUpdate,
    text,
  };
}
