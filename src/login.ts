import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export function startLogin(app: firebase.app.App) {
  const authUiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '/terms',
    privacyPolicyUrl() {
      window.location.assign('/privacy');
    }
  };

  const authUi = new firebaseui.auth.AuthUI(app.auth());
  if (authUi.isPendingRedirect()) {
    authUi.start('#firebaseui-auth-container', authUiConfig);
  }
}
