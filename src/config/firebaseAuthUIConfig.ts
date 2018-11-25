import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import { isStandalone } from '../utils/isStandalone';
import { appConfig } from './AppConfig';

const standalone = isStandalone();

export const firebaseAuthUIConfig: firebaseui.auth.Config = {
  signInSuccessUrl: appConfig.baseUrl,
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  popupMode: standalone,
  signInFlow: standalone ? 'popup' : 'redirect',
  tosUrl: '/terms',
  privacyPolicyUrl() {
    window.location.assign('/privacy');
  },
};
