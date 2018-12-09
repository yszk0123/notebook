import * as firebase from 'firebase/app';
import { createWord } from '../../../models/Word';
import { wordActions } from '../word-type';
import { WordEffectCreator } from './WordEffectType';

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

export const add: WordEffectCreator<[AddInput]> = input => async dispatch => {
  dispatch(wordActions.add(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const newWord = await doAdd(input, db);

  dispatch(wordActions.addSuccess({ userId: input.userId, word: newWord }));
};
