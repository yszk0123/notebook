import * as firebase from 'firebase/app';
import { getWordsGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const loadSideEffect: WordThunk<{ userId: string }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.load());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const words = await getWordsGateway(input, injections);

  dispatch(wordActions.loadSuccess({ words }));
};
