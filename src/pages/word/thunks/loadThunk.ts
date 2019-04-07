import { getWordsGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const loadSideEffect: WordThunk<{ userId: string }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.load());

  const words = await getWordsGateway(input, injections);

  dispatch(wordActions.loadSuccess({ words }));
};
