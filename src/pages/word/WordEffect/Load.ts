import * as firebase from 'firebase/app';
import { isNotNull } from 'option-t/lib/Nullable';
import { unwrapDocumentSnapshot } from '../../../utils/unwrapDocumentSnapshot';
import { createWord, Word } from '../entities/Word';
import { wordActions } from '../word-type';
import { WordEffectCreator } from './WordEffectType';

const WORD_LIMIT = 20;

interface LoadInput {
  userId: string;
}

async function doLoad(
  input: LoadInput,
  db: firebase.firestore.Firestore,
): Promise<Array<Word>> {
  const userRef = db.collection('users').doc(input.userId);
  const wordsRef = userRef
    .collection('words')
    .orderBy('createdAt', 'desc')
    .limit(WORD_LIMIT);
  const wordsSnapshot = await wordsRef.get();
  const words = wordsSnapshot.docs
    .map(doc => unwrapDocumentSnapshot<Word>(doc))
    .filter(isNotNull)
    .map(createWord);
  return words;
}

export const load: WordEffectCreator<[LoadInput]> = input => async dispatch => {
  dispatch(wordActions.load());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const words = await doLoad(input, db);

  dispatch(wordActions.loadSuccess({ words }));
};
