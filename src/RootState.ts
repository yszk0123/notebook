import { RoutingGlobalState } from './app/routing/routing-type';
import { CounterGlobalState } from './pages/counter/counter-type';
import { NoteGlobalState } from './pages/note';
import { WordGlobalState } from './pages/word/word-type';

export interface RootState
  extends NoteGlobalState,
    RoutingGlobalState,
    WordGlobalState,
    CounterGlobalState {}
