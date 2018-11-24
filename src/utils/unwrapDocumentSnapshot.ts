import * as firebase from 'firebase/app';
import { Nullable } from 'option-t/lib/Nullable';
import { unwrapOr } from 'option-t/lib/Undefinable';

export function unwrapDocumentSnapshot<T>(
  doc: firebase.firestore.DocumentSnapshot,
): Nullable<T> {
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  return unwrapOr<Nullable<T>>(data as T, null);
}
