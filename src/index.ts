import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import { config } from './config';
import { startLogin } from './login';
import { render } from './render';

interface UserParam {
  displayName: string;
  visitCount: number;
}

class User {
  public displayName: string;
  public visitCount: number;
  constructor(param: UserParam) {
    this.displayName = param.displayName;
    this.visitCount = param.visitCount;
  }
}

function login(app: firebase.app.App): Promise<User> {
  return new Promise((resolve, reject) => {
    startLogin(app);

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return reject(new Error('user not found'));
      }

      const db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });

      const usersRef = await db.collection('users');
      const userRef = usersRef.doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        if (!data) {
          return;
        }
        const user = new User(data as any);
        await userRef.update({ visitCount: user.visitCount + 1 });
        return resolve(user);
      }

      const accessToken = await user.getIdToken();
      const { displayName, uid } = user;
      userRef.set({
        accessToken,
        displayName,
        uid,
        visitCount: 1,
      });
    });
  });
}

async function main() {
  const app = firebase.initializeApp(config.firebase);
  const user = await login(app);
}

// main().catch(console.error);

render().catch(console.error);
