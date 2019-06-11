const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
};
