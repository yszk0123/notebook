import { isNull, Nullable } from 'option-t/lib/Nullable';
import { SideEffect } from '../../../app/redux';
import { NoteAction, noteActions } from '../NoteActions';
import { NoteGlobalState } from '../NoteState';
import { LoadNote } from '../useCases/LoadNote';

export interface LoadNoteSideEffectInput {
  userId: Nullable<string>;
  noteId: string;
}

interface LoadNoteSideEffectContext {
  loadNote: LoadNote;
}

export interface LoadNoteEffect
  extends SideEffect<NoteGlobalState, NoteAction, LoadNoteSideEffectInput> {}

export function createLoadNoteEffect({ loadNote }: LoadNoteSideEffectContext): LoadNoteEffect {
  return ({ userId, noteId }) => async dispatch => {
    if (isNull(userId)) {
      return;
    }

    dispatch(noteActions.load());

    const note = await loadNote({ userId, noteId });

    dispatch(noteActions.loadSuccess({ note }));
  };
}
