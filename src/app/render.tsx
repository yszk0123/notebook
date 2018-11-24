import * as firebase from 'firebase/app';
import { Location } from 'history';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import UniversalRouter from 'universal-router';
import { firebaseConfig } from '../config/firebaseConfig';
import { FirebaseAppProvider } from '../FirebaseAppContext';
import { HistoryProvider } from '../HistoryContext';
import { routingEffects } from '../routing';
import { GlobalNavigation } from '../routing/components/GlobalNavigation';
import { routes } from '../routing/routes';
import { ThemeProvider } from '../styled-components';
import { theme } from '../theme';
import { GlobalStyle } from './components/GlobalStyle';
import { Loading } from './components/Loading';
import { createStore } from './createStore';

declare global {
  interface Window {
    app: any;
  }
}

function init() {
  if (process.env.NODE_ENV === 'development' && window.app) {
    return window.app;
  }
  const app = firebase.initializeApp(firebaseConfig);
  window.app = app;
  return app;
}

export async function render() {
  const router = new UniversalRouter(routes);
  const history = createHistory();
  const store = createStore();
  const app = init();
  const dispatch = store.dispatch as Dispatch<any>;

  history.listen(onLocationChange);
  onLocationChange(history.location);

  firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      return;
    }
    await dispatch(routingEffects.login(user));
  }, console.error);

  async function onLocationChange(location: Location) {
    const context = {
      app,
      pathname: location.pathname,
      dispatch: store.dispatch,
    };
    const { content } = await router.resolve(context);
    renderWithContent(content);
  }

  function renderWithContent(content: JSX.Element) {
    const mountPoint = document.getElementById('root');

    ReactDOM.render(
      <HistoryProvider value={history}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <FirebaseAppProvider value={app}>
              <>
                <GlobalNavigation />
                <Loading>{content}</Loading>
                <GlobalStyle />
              </>
            </FirebaseAppProvider>
          </Provider>
        </ThemeProvider>
      </HistoryProvider>,
      mountPoint,
    );
  }
}