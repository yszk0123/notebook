import * as firebase from 'firebase/app';
import { Location } from 'history';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import UniversalRouter from 'universal-router';
import { GlobalNavigation } from './components/GlobalNavigation';
import { GlobalStyle } from './components/GlobalStyle';
import { Loading } from './components/Loading';
import { config } from './config';
import { FirebaseAppProvider } from './FirebaseAppContext';
import { HistoryProvider } from './HistoryContext';
import { routes } from './routes';
import { createStore } from './store/createStore';
import { globalEffects } from './store/global';
import { ThemeProvider } from './styled-components';
import { theme } from './theme';

declare global {
  interface Window {
    app: any;
  }
}

function init() {
  if (process.env.NODE_ENV === 'development' && window.app) {
    return window.app;
  }
  const app = firebase.initializeApp(config.firebase);
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
    await dispatch(globalEffects.login(user));
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
