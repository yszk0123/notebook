import { Effect } from '../../../redux';
import { WordAction, WordGlobalState } from '../word-type';

export type WordEffectCreator<Args> = Effect<WordGlobalState, WordAction, Args>;
