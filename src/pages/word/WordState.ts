import { Word, WordId } from './entities/Word';

export interface WordLocalState {
  loading: boolean;
  saving: boolean;
  outdatedWordIds: WordId[];
  wordIds: WordId[];
  wordsById: Record<WordId, Word>;
}

export interface WordGlobalState {
  word: WordLocalState;
}
