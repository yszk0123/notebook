import { isNull, Nullable } from 'option-t/lib/Nullable';
import { EditorContent } from '../../../modules/editor';
import { Effect, EffectFactory } from '../../../redux';
import { sleep } from '../../../utils/sleep';
import { NoteAction, noteActions, NoteGlobalState } from '../note-type';
import { SaveNoteUseCase } from '../useCases/SaveNoteUseCase';

const SAVE_DELAY = 750;

interface SaveNoteEffectInput {
  userId: Nullable<string>;
  noteId: string;
  content: Nullable<EditorContent>;
}

interface SaveNoteEffectContext {
  saveNote: SaveNoteUseCase;
}

export interface SaveNoteEffect
  extends Effect<NoteGlobalState, NoteAction, SaveNoteEffectInput> {}

export interface SaveNoteEffectFactory
  extends EffectFactory<SaveNoteEffect, SaveNoteEffectContext> {}

export const createSaveNoteEffect: SaveNoteEffectFactory = ({ saveNote }) => {
  const saveNoteEffect: SaveNoteEffect = ({
    userId,
    noteId,
    content,
  }) => async dispatch => {
    if (isNull(userId) || isNull(content)) {
      return;
    }

    dispatch(noteActions.save());

    const input = {
      note: {
        content,
        id: noteId,
      },
      userId,
    };
    await saveNote(input);

    await sleep(SAVE_DELAY);

    dispatch(noteActions.saveSuccess());
  };
  return saveNoteEffect;
};
