import { sleep } from '../../../application/utils/sleep';
import { Word } from '../entities/Word';
import { putWordGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

const SAVE_DELAY = 500;

export const saveThunk: WordThunk<{ userId: string; word: Word }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.save(input));

  await putWordGateway(input, injections);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveSuccess(input));
};
