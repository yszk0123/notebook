import { isNull, Nullable } from 'option-t/lib/Nullable';
import { SideEffect } from '../../../application/LegacyDucksType';
import { sleep } from '../../../application/utils/sleep';
import { EditorContent } from '../../../modules/editor';
import { NoteAction, noteActions } from '../NoteActions';
import { NoteGlobalState } from '../NoteState';
import { SaveNote } from '../useCases/SaveNote';

const SAVE_DELAY = 750;

interface SaveNoteSideEffectInput {
  userId: Nullable<string>;
  noteId: string;
  content: Nullable<EditorContent>;
}

interface SaveNoteSideEffectContext {
  saveNote: SaveNote;
}

export interface SaveNoteSideEffect
  extends SideEffect<NoteGlobalState, NoteAction, SaveNoteSideEffectInput> {}

export function createSaveNoteSideEffect({
  saveNote,
}: SaveNoteSideEffectContext): SaveNoteSideEffect {
  return ({ userId, noteId, content }) => async dispatch => {
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
}
