import { AppState } from '../../../app/app-type';
import { EffectCreator } from '../../../redux';
import { WordAction } from '../word-type';

export type WordEffectCreator<Args> = EffectCreator<AppState, WordAction, Args>;
