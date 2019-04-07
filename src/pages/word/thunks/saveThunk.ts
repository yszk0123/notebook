import * as firebase from 'firebase/app';
import { sleep } from '../../../app/utils/sleep';
import { Word } from '../entities/Word';
import { putWordGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

const SAVE_DELAY = 500;

export const saveSideEffect: WordThunk<{ userId: string; word: Word }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.save(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await putWordGateway(input, injections);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveSuccess(input));
};
