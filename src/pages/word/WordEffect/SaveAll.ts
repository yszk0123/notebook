import * as firebase from 'firebase/app';
import { Word } from '../../../models/Word';
import { sleep } from '../../../utils/sleep';
import { wordActions } from '../word-type';
import { WordEffectCreator } from './WordEffectType';

const SAVE_DELAY = 750;

interface SaveAllInput {
  userId: string;
  words: Word[];
}

async function doSaveAll(
  input: SaveAllInput,
  db: firebase.firestore.Firestore,
): Promise<Word[]> {
  const userRef = db.collection('users').doc(input.userId);

  // FIXME: Batch save
  const savedWords = await Promise.all(
    input.words
      .filter(word => word.dirty)
      .map(async word => {
        const wordRef = userRef.collection('words').doc(word.id);
        await wordRef.set(word);
        return word;
      }),
  );

  return savedWords;
}

export const saveAll: WordEffectCreator<
  [SaveAllInput]
> = input => async dispatch => {
  dispatch(wordActions.saveAll(input));

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const savedWords = await doSaveAll(input, db);

  await sleep(SAVE_DELAY);

  const successInput = {
    ...input,
    savedWords,
  };
  dispatch(wordActions.saveAllSuccess(successInput));
};
