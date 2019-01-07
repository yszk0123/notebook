import { isNull, Nullable } from 'option-t/lib/Nullable';
import { Effect } from '../../../app/redux';
import { EditorContent } from '../../../modules/editor';
import { sleep } from '../../../utils/sleep';
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
  extends Effect<NoteGlobalState, NoteAction, SaveNoteSideEffectInput> {}

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
