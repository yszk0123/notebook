import * as firebase from 'firebase/app';
import { Word } from '../../../models/Word';
import { sleep } from '../../../utils/sleep';
import { wordActions } from '../word-type';
import { WordEffectCreator } from './WordEffectType';

const SAVE_DELAY = 750;

interface SaveInput {
  userId: string;
  word: Word;
}

async function doSave(input: SaveInput, db: firebase.firestore.Firestore) {
  if (!input.word.dirty) {
    return;
  }

  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc(input.word.id);
  await wordRef.set(input.word);
}

export const save: WordEffectCreator<[SaveInput]> = input => async dispatch => {
  dispatch(wordActions.save(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doSave(input, db);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveSuccess(input));
};
