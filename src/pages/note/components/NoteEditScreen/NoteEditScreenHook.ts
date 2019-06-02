import { useCallback, useEffect, useState } from 'react';
import { isNotNull, Nullable } from '../../../../application/utils/Maybe';
import {
  GetProp,
  NoteEditScreenQuery,
  useDeleteNoteMutation,
  useInsertNoteMutation,
  useNoteEditScreenQuery,
  useUpdateNoteMutation,
} from '../../../../GraphQLType';
import { NoteScreenDocument, NoteScreenQuery } from '../../../../__generated__/GraphQLOperations';

interface Props {
  loading: boolean;
  note: Nullable<Note>;
  text: string;
  onChangeText: (text: string) => void;
  onDelete: (id: number) => void;
  onInsert: () => void;
  onUpdate: (id: number) => void;
}

// FIXME: Remove (#54)
export type Note = GetProp<NoteEditScreenQuery, 'notes', 0>;
const loadingNotes: Note[] = [];

export function useNoteEditScreen(noteId: number): Props {
  const { data, loading } = useNoteEditScreenQuery({ variables: { id: noteId } });
  const [text, setText] = useState('');
  const notes = (data && data.notes) || loadingNotes;
  const note = notes.length ? notes[0] : null;
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
      const deletingIds = newData!.delete_notes!.returning!.map(e => e.id);

      cache.writeQuery<NoteScreenQuery>({
        data: {
          ...oldData,
          notes: oldData.notes.filter(e => !deletingIds.includes(e.id)),
        },
        query: NoteScreenDocument,
      });
    },
  });

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

  const onDelete = useCallback(
    (id: number) => {
      if (confirm('This operation cannot be undone')) {
        deleteNote({ variables: { id } });
      }
    },
    [deleteNote],
  );

  useEffect(() => {
    if (isNotNull(note)) {
      setText(note.text);
    }
  }, [note]);

  return {
    loading,
    note,
    onChangeText,
    onDelete,
    onInsert,
    onUpdate,
    text,
  };
}
