import { Dispatch } from 'redux';
import { CounterState } from '../pages/counter/counter-type';
import { NoteGlobalState } from '../pages/note/note-type';
import { WordState } from '../pages/word/word-type';
import { RoutingGlobalState } from '../routing/routing-type';

export interface AppState extends NoteGlobalState, RoutingGlobalState {
  counter: CounterState;
  word: WordState;
}

export interface AppRoutingContext {
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;
  pathname: string;
  dispatch: Dispatch;
}
