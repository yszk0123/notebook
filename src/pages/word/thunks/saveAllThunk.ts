import * as firebase from 'firebase/app';
import { sleep } from '../../../app/utils/sleep';
import { Word } from '../entities/Word';
import { wordActions } from '../WordActions';
import { WordSideEffect } from '../sideEffects/WordSideEffectType';

const SAVE_DELAY = 750;

interface SaveAllInput {
  userId: string;
  words: Word[];
}

async function doSaveAll(input: SaveAllInput, db: firebase.firestore.Firestore) {
  const userRef = db.collection('users').doc(input.userId);

  // FIXME: Batch save
  await Promise.all(
    input.words.map(async word => {
      const wordRef = userRef.collection('words').doc(word.id);
      await wordRef.set(word);
      return word;
    }),
  );
}

export const saveAllSideEffect: WordSideEffect<SaveAllInput> = input => async dispatch => {
  dispatch(wordActions.saveAll(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  await doSaveAll(input, db);

  await sleep(SAVE_DELAY);

  dispatch(wordActions.saveAllSuccess(input));
};
