import { copyToClipboard } from '../../../utils/copyToClipboard';
import { noteActions } from '../note-type';
import { NoteEffectCreator } from './NoteEffectType';

interface CopyTextInput {
  text: string;
}

export const copyText: NoteEffectCreator<
  [CopyTextInput]
> = input => async dispatch => {
  dispatch(noteActions.copyText(input));

  copyToClipboard(input.text);

  dispatch(noteActions.copyTextSuccess());
};
