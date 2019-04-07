import { getWordsGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const loadAllThunk: WordThunk<{ userId: string }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.loadAll());

  const words = await getWordsGateway(input, injections);

  dispatch(wordActions.loadAllSuccess({ words }));
};
