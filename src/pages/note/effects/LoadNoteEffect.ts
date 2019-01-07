import { isNull, Nullable } from 'option-t/lib/Nullable';
import { Effect } from '../../../app/redux';
import { NoteAction, noteActions } from '../NoteActions';
import { NoteGlobalState } from '../NoteState';
import { LoadNote } from '../useCases/LoadNote';

export interface LoadNoteEffectInput {
  userId: Nullable<string>;
  noteId: string;
}

interface LoadNoteEffectContext {
  loadNote: LoadNote;
}

export interface LoadNoteEffect
  extends Effect<NoteGlobalState, NoteAction, LoadNoteEffectInput> {}

export function createLoadNoteEffect({
  loadNote,
}: LoadNoteEffectContext): LoadNoteEffect {
  return ({ userId, noteId }) => async dispatch => {
    if (isNull(userId)) {
      return;
    }

    dispatch(noteActions.load());

    const note = await loadNote({ userId, noteId });

    dispatch(noteActions.loadSuccess({ note }));
  };
}
