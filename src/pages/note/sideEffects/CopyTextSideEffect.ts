import { SideEffect } from '../../../application/LegacyDucksType';
import { copyToClipboard } from '../../../application/utils/copyToClipboard';
import { NoteAction, noteActions } from '../NoteActions';
import { NoteGlobalState } from '../NoteState';

interface CopyTextInput {
  text: string;
}

export interface CopyTextSideEffect
  extends SideEffect<NoteGlobalState, NoteAction, CopyTextInput> {}

export function createCopyTextSideEffect(): CopyTextSideEffect {
  return input => async dispatch => {
    dispatch(noteActions.copyText(input));

    copyToClipboard(input.text);

    dispatch(noteActions.copyTextSuccess());
  };
}
