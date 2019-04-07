import { Word, WordID } from './entities/Word';

export interface WordLocalState {
  loading: boolean;
  saving: boolean;
  outdatedWordIds: WordID[];
  wordIds: WordID[];
  wordsById: Record<WordID, Word>;
}

export interface WordGlobalState {
  word: WordLocalState;
}
