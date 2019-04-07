import firebase from 'firebase/app';

export interface AppInjections {
  db: firebase.firestore.Firestore;
}

export type Gateway<Input, Output = void> = Input extends void
  ? (injections: AppInjections) => Promise<Output>
  : (input: Input, injections: AppInjections) => Promise<Output>;
