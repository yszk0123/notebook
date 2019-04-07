import { isNotNull, Nullable } from 'option-t/lib/Nullable';
import { Gateway } from '../../../application/ApplicationType';
import { unwrapDocumentSnapshot } from '../../../application/utils/unwrapDocumentSnapshot';
import { createWord, Word } from '../entities/Word';

const WORD_LIMIT = 15;

export const getWordsGateway: Gateway<{ userId: string }, Word[]> = async (input, { db }) => {
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
};

export const getWordGateway: Gateway<{ userId: string; wordId: string }, Nullable<Word>> = async (
  { userId, wordId },
  { db },
) => {
  const userRef = db.collection('users').doc(userId);
  const wordRef = userRef.collection('words').doc(wordId);
  const wordSnapshot = await wordRef.get();
  return unwrapDocumentSnapshot<Word>(wordSnapshot);
};

export const postWordGateway: Gateway<{ userId: string; content: string }, Word> = async (
  input,
  { db },
) => {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc();
  const word = createWord({ id: wordRef.id, content: input.content });
  await wordRef.set(word);
  return word;
};

export const putWordsGateway: Gateway<{ userId: string; words: Word[] }> = async (
  input,
  { db },
) => {
  const userRef = db.collection('users').doc(input.userId);

  // FIXME: Batch save
  await Promise.all(
    input.words.map(async word => {
      const wordRef = userRef.collection('words').doc(word.id);
      await wordRef.set(word);
      return word;
    }),
  );
};

export const putWordGateway: Gateway<{ userId: string; word: Word }> = async (input, { db }) => {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc(input.word.id);
  await wordRef.set(input.word);
};

export const deleteWordGateway: Gateway<{ userId: string; word: Word }> = async (input, { db }) => {
  const userRef = db.collection('users').doc(input.userId);
  const wordRef = userRef.collection('words').doc(input.word.id);
  await wordRef.delete();
};
