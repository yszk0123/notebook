import { CounterGlobalState } from './pages/counter/counter-type';
import { NoteGlobalState } from './pages/note/note-type';
import { WordGlobalState } from './pages/word/word-type';
import { RoutingGlobalState } from './routing/routing-type';

export interface AppState
  extends NoteGlobalState,
    RoutingGlobalState,
    WordGlobalState,
    CounterGlobalState {}
