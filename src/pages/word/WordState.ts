import { Word, WordId } from './entities/Word';

export interface WordLocalState {
  loading: boolean;
  saving: boolean;
  outdatedWordIds: Array<WordId>;
  wordIds: Array<WordId>;
  wordsById: Record<WordId, Word>;
}

export interface WordGlobalState {
  word: WordLocalState;
}
