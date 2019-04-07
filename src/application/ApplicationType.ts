import firebase from 'firebase/app';

export interface AppInjections {
  db: firebase.firestore.Firestore;
}

export type Gateway<Input, Output = void> = Input extends void
  ? (injections: AppInjections) => Promise<Output>
  : (input: Input, injections: AppInjections) => Promise<Output>;

export type UseCase<Input, Output> = Input extends any[]
  ? (...args: Input) => Promise<Output>
  : Input extends void
  ? () => Promise<Output>
  : (input: Input) => Promise<Output>;

export type UseCaseContext = any;
