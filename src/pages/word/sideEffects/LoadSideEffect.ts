import * as firebase from 'firebase/app';
import { isNotNull } from 'option-t/lib/Nullable';
import { unwrapDocumentSnapshot } from '../../../app/utils/unwrapDocumentSnapshot';
import { createWord, Word } from '../entities/Word';
import { wordActions } from '../WordActions';
import { WordSideEffect } from './WordSideEffectType';

const WORD_LIMIT = 15;

interface LoadInput {
  userId: string;
}

async function doLoad(input: LoadInput, db: firebase.firestore.Firestore): Promise<Word[]> {
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

export const loadSideEffect: WordSideEffect<LoadInput> = input => async dispatch => {
  dispatch(wordActions.load());

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const words = await doLoad(input, db);

  dispatch(wordActions.loadSuccess({ words }));
};
