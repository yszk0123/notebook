import { isNull, Nullable } from 'option-t/lib/Nullable';
import { Effect, EffectFactory } from '../../../redux';
import { NoteAction, noteActions, NoteGlobalState } from '../note-type';
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

export interface LoadNoteEffectFactory
  extends EffectFactory<LoadNoteEffect, LoadNoteEffectContext> {}

export const createLoadNoteEffect: LoadNoteEffectFactory = ({ loadNote }) => {
  const loadNoteEffect: LoadNoteEffect = ({
    userId,
    noteId,
  }) => async dispatch => {
    if (isNull(userId)) {
      return;
    }

    dispatch(noteActions.load());

    const note = await loadNote({ userId, noteId });

    dispatch(noteActions.loadSuccess(note));
  };
  return loadNoteEffect;
};
