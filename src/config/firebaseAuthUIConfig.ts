import firebase from 'firebase/app';
import { appConfig } from './AppConfig';

export const firebaseAuthUIConfig = {
  signInSuccessUrl: appConfig.baseUrl,
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/terms',
  privacyPolicyUrl() {
    window.location.assign('/privacy');
  },
};
