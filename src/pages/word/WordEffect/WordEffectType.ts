import { AppState } from '../../../app/app-type';
import { Effect } from '../../../redux';
import { WordAction } from '../word-type';

export type WordEffectCreator<Args> = Effect<AppState, WordAction, Args>;
