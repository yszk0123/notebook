import { RoutingGlobalState } from './app/routing';
import { CounterGlobalState } from './pages/counter';
import { NoteGlobalState } from './pages/note';
import { WordGlobalState } from './pages/word';

export interface RootState
  extends NoteGlobalState,
    RoutingGlobalState,
    WordGlobalState,
    CounterGlobalState {}
