import * as firebase from 'firebase/app';
import { isNotNull, Nullable } from 'option-t/lib/Nullable';
import { AppState } from '../app/app-type';
import { EffectCreator } from '../redux';
import { unwrapDocumentSnapshot } from '../utils/unwrapDocumentSnapshot';
import { RoutingAction, routingActions } from './routing-type';

type RoutingEffectCreator<Args> = EffectCreator<AppState, RoutingAction, Args>;

interface UserParam {
  accessToken: string;
  displayName: Nullable<string>;
  visitCount: number;
  uid: string;
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

  const usersRef = db.collection('users');
  const userRef = user.uid ? usersRef.doc(user.uid) : usersRef.doc();

  {
    const doc = await userRef.get();
    const userParam = unwrapDocumentSnapshot<UserParam>(doc);
    if (isNotNull(userParam)) {
      const user = new User(userParam);
      await userRef.update({ visitCount: user.visitCount + 1 });
      return user;
    }
  }

  const accessToken = await user.getIdToken();
  const { displayName, uid } = user;
  const userParam: UserParam = {
    accessToken,
    displayName,
    uid,
    visitCount: 1,
  };
  await userRef.set(userParam);
  return new User(userParam);
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
