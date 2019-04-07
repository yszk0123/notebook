import firebase from 'firebase/app';
import { isNotNull, Nullable } from 'option-t/lib/Nullable';
import { Gateway } from '../../type';
import { unwrapDocumentSnapshot } from '../../utils/unwrapDocumentSnapshot';

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

export const loginGateway: Gateway<firebase.User, Nullable<User>> = async (user, { db }) => {
  const usersRef = db.collection('users');
  const userRef = user.uid ? usersRef.doc(user.uid) : usersRef.doc();

  {
    const doc = await userRef.get();
    const userParam = unwrapDocumentSnapshot<UserParam>(doc);
    if (isNotNull(userParam)) {
      const newUser = new User(userParam);
      await userRef.update({ visitCount: newUser.visitCount + 1 });
      return newUser;
    }
  }

  {
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
};
