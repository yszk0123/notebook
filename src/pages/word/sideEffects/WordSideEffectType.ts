import { SideEffect } from '../../../app/redux';
import { WordAction } from '../WordActions';
import { WordGlobalState } from '../WordState';

export type WordSideEffect<Args> = SideEffect<WordGlobalState, WordAction, Args>;
