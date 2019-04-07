import * as firebase from 'firebase/app';
import { Word } from '../entities/Word';
import { deleteWordGateway } from '../gateways/WordGateway';
import { wordActions } from '../WordActions';
import { WordThunk } from '../WordThunkType';

export const removeSideEffect: WordThunk<{ userId: string; word: Word }> = input => async (
  dispatch,
  _getState,
  injections,
) => {
  dispatch(wordActions.remove(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await deleteWordGateway(input, injections);

  dispatch(
    wordActions.removeSuccess({
      removedWordId: input.word.id,
      userId: input.userId,
    }),
  );
};
