import * as firebase from 'firebase/app';
import { createWord } from '../entities/Word';
import { WordSideEffect } from '../sideEffects/WordSideEffectType';
import { wordActions } from '../WordActions';

interface AddInput {
  userId: string;
  content: string;
}

async function doAdd(input: AddInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc();
  const word = createWord({ id: wordRef.id, content: input.content });
  await wordRef.set(word);
  return word;
}

export const addSideEffect: WordSideEffect<AddInput> = input => async dispatch => {
  dispatch(wordActions.add(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const newWord = await doAdd(input, db);

  dispatch(wordActions.addSuccess({ userId: input.userId, word: newWord }));
};
