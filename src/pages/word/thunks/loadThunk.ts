import { isNull } from 'option-t/lib/Nullable';
import { WordID } from '../entities/Word';
import { getWordGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const loadThunk: WordThunk<{ userId: string; wordId: WordID }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.load());

  const word = await getWordGateway(input, injections);
  if (isNull(word)) {
    dispatch(wordActions.loadFailure());
    return;
  }

  dispatch(wordActions.loadSuccess({ word }));
};
