import { sleep } from '../../../app/utils/sleep';
import { Word } from '../entities/Word';
import { putWordsGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

const SAVE_DELAY = 750;

export const saveAllSideEffect: WordThunk<{
  userId: string;
  words: Word[];
}> = input => async (dispatch, _getState, injections) => {
  dispatch(wordActions.saveAll(input));

  await putWordsGateway(input, injections);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveAllSuccess(input));
};
