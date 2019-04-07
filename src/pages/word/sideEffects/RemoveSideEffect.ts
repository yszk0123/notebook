import * as firebase from 'firebase/app';
import { Word } from '../entities/Word';
import { wordActions } from '../WordActions';
import { WordSideEffect } from './WordSideEffectType';

interface RemoveInput {
  userId: string;
  word: Word;
}

async function doRemove(input: RemoveInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc(input.word.id);
  await wordRef.delete();
}

export const removeSideEffect: WordSideEffect<[RemoveInput]> = input => async dispatch => {
  dispatch(wordActions.remove(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doRemove(input, db);

  dispatch(
    wordActions.removeSuccess({
      removedWordId: input.word.id,
      userId: input.userId,
    }),
  );
};
