import * as firebase from 'firebase/app';
import { sleep } from '../../../app/utils/sleep';
import { Word } from '../entities/Word';
import { WordSideEffect } from '../sideEffects/WordSideEffectType';
import { wordActions } from '../WordActions';

const SAVE_DELAY = 500;

interface SaveInput {
  userId: string;
  word: Word;
}

async function doSave(input: SaveInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc(input.word.id);
  await wordRef.set(input.word);
}

export const saveSideEffect: WordSideEffect<SaveInput> = input => async dispatch => {
  dispatch(wordActions.save(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doSave(input, db);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveSuccess(input));
};
