import { Effect } from '../../../redux';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { NoteAction, noteActions, NoteGlobalState } from '../note-type';

interface CopyTextInput {
  text: string;
}

export interface CopyTextEffect
  extends Effect<NoteGlobalState, NoteAction, CopyTextInput> {}

export function createCopyTextEffect(): CopyTextEffect {
  return input => async dispatch => {
    dispatch(noteActions.copyText(input));

    copyToClipboard(input.text);

    dispatch(noteActions.copyTextSuccess());
  };
}
