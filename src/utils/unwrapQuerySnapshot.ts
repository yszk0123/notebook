import * as firebase from 'firebase/app';

export function unwrapQuerySnapshot<T>(
  snapshot: firebase.firestore.QuerySnapshot,
): T[] {
  if (snapshot.empty) {
    return [];
  }

  // FIXME: Avoid any
  // tslint:disable-next-line:no-any
  return (snapshot.docs as any) as T[];
}
