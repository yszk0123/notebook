import { Thunk } from '../../application/DucksType';
import { WordAction } from './WordActions';
import { WordGlobalState } from './WordState';

export type WordThunk<Payload> = Thunk<WordGlobalState, Payload, WordAction>;
