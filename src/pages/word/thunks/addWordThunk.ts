import firebase from 'firebase/app';
import { postWordGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const addSideEffect: WordThunk<{
  userId: string;
  content: string;
}> = input => async (dispatch, _getState, injections) => {
  dispatch(wordActions.add(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const newWord = await postWordGateway(input, injections);

  dispatch(wordActions.addSuccess({ userId: input.userId, word: newWord }));
};
