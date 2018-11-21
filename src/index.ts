import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import { config } from './config';
import { startLogin } from './login';
import { render } from './render';

class User {
  constructor(public displayName: string) {}
}

function start(user: User) {
  const div = document.createElement('div');
  div.innerText = `Hello, ${user.displayName}!`;
  document.body.appendChild(div);
}

async function main() {
  const app = firebase.initializeApp(config.firebase);

  startLogin(app);
  firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      return;
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
      start(new User(data.displayName));
      return;
    }

    const accessToken = await user.getIdToken();
    const { displayName, uid } = user;
    userRef.set({
      accessToken,
      displayName,
      uid
    });
  });
}

// main().catch(console.error);

render();
