import { useCallback, useState } from 'react';
import { isNotUndefined } from '../../../../application/utils/Maybe';
import {
  GetProp,
  NoteScreenDocument,
  NoteScreenQuery,
  useDeleteNoteMutation,
  useInsertNoteMutation,
  useNoteScreenQuery,
  useUpdateNoteMutation,
} from '../../../../GraphQLType';

interface Props {
  loading: boolean;
  notes: Note[];
  text: string;
  onChangeText: (text: string) => void;
  onDelete: (id: number) => void;
  onInsert: () => void;
  onSelectItem: (id: number) => void;
  onUpdate: (id: number) => void;
}

// FIXME: Remove (#54)
export type Note = GetProp<NoteScreenQuery, 'notes', 0>;
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
  const deleteNote = useDeleteNoteMutation({
    update(cache, { data: newData }) {
      const oldData = cache.readQuery<NoteScreenQuery>({ query: NoteScreenDocument })!;
      const deletingIds = newData!.delete_notes!.returning!.map(note => note.id);

      cache.writeQuery<NoteScreenQuery>({
        data: {
          ...oldData,
          notes: oldData.notes.filter(note => !deletingIds.includes(note.id)),
        },
        query: NoteScreenDocument,
      });
    },
  });

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const onSelectItem = useCallback(
    (id: number) => {
      const foundNote = notes.find(note => note.id === id);
      if (isNotUndefined(foundNote)) {
        setText(foundNote.text);
      }
    },
    [notes],
  );

  const onInsert = useCallback(() => {
    insertNote({ variables: { input: { text } } });
  }, [insertNote, text]);

  const onUpdate = useCallback(
    (id: number) => {
      updateNote({ variables: { id, input: { text } } });
    },
    [updateNote, text],
  );

  const onDelete = useCallback(
    (id: number) => {
      deleteNote({ variables: { id } });
    },
    [deleteNote],
  );

  return {
    loading,
    notes,
    onChangeText,
    onDelete,
    onInsert,
    onSelectItem,
    onUpdate,
    text,
  };
}
