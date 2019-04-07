import { Thunk } from '../../app/redux';
import { WordAction } from './WordActions';
import { WordGlobalState } from './WordState';

export type WordThunk<Payload> = Thunk<WordGlobalState, Payload, WordAction>;
