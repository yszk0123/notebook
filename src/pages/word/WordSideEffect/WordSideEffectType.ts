import { Effect } from '../../../app/redux';
import { WordAction } from '../WordActions';
import { WordGlobalState } from '../WordState';

export type WordSideEffect<Args> = Effect<WordGlobalState, WordAction, Args>;
