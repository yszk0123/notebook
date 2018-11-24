import * as firebase from 'firebase/app';
import { AppState } from '../app/app-type';
import { EffectCreator } from '../redux';
import { RoutingAction, routingActions } from './routing-type';

type RoutingEffectCreator<Args extends any[] = []> = EffectCreator<
  AppState,
  RoutingAction,
  Args
>;

interface UserParam {
  displayName?: string;
  visitCount?: number;
  uid?: string;
}

class User {
  public displayName: string;
  public visitCount: number;
  public uid: string;
  constructor(param: UserParam) {
    this.displayName = param.displayName || '';
    this.visitCount = param.visitCount || 0;
    this.uid = param.uid || '';
  }
}

async function loginUser(user: firebase.User): Promise<User | null> {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const usersRef = await db.collection('users');
  const userRef = user.uid ? usersRef.doc(user.uid) : usersRef.doc();
  const doc = await userRef.get();
  if (doc.exists) {
    const data = doc.data();
    if (!data) {
      return null;
    }
    const user = new User(data as any);
    await userRef.update({ visitCount: user.visitCount + 1 });
    return user;
  }

  const accessToken = await user.getIdToken();
  const { displayName, uid } = user;
  const data = {
    accessToken,
    displayName,
    uid,
    visitCount: 1,
  };
  userRef.set(data);
  return new User(data as any);
}

const login: RoutingEffectCreator<
  [firebase.User]
> = firebaseUser => async dispatch => {
  const user = await loginUser(firebaseUser);
  if (!user) {
    dispatch(routingActions.loginFailure());
    return;
  }

  dispatch(routingActions.login(user));
};

export const routingEffects = { login };
