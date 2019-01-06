import * as firebase from 'firebase/app';
import { Location } from 'history';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import UniversalRouter from 'universal-router';
import { resolveRoute } from './AppRouteResolver';
import { appRoutes } from './AppRoutes';
import { createStore } from './AppStoreFactory';
import { ResetStyle } from './components/ResetStyle';
import { firebaseConfig } from './config/firebaseConfig';
import { FirebaseAppProvider } from './FirebaseAppContext';
import { HistoryProvider } from './HistoryContext';
import { routingEffects } from './routing';
import { PageLoadingContainer } from './routing/components/PageLoadingContainer';
import { Page, RoutingContext } from './routing/routing-type';
import { ThemeProvider } from './styled-components';
import { defaultTheme } from './theme/DefaultTheme';
import { restoreValueFromGlobalForDevelopment } from './utils/restoreValueFromGlobalForDevelopment';

function init() {
  if (process.env.NODE_ENV === 'development') {
    return restoreValueFromGlobalForDevelopment('app', () => {
      return firebase.initializeApp(firebaseConfig);
    });
  }
  return firebase.initializeApp(firebaseConfig);
}

function resolveLocation(location: Location): string {
  const qs = location.search
    .slice(1)
    .split('&')
    .find(s => s.startsWith('redirect='));
  if (!qs) {
    return location.pathname;
  }

  return decodeURIComponent(qs.replace('redirect=', ''));
}

export async function render() {
  const app = init();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  const router = new UniversalRouter(appRoutes, {
    baseUrl: process.env.APP_BASE_URL,
    resolveRoute,
  });
  const history = createHistory();
  const store = createStore();
  const dispatch = store.dispatch;

  history.listen(onLocationChange);
  // tslint:disable-next-line:no-floating-promises
  onLocationChange(history.location);

  firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      return;
    }
    dispatch(routingEffects.login(user));
  });

  async function onLocationChange(location: Location) {
    const pathname = resolveLocation(location);
    if (pathname !== location.pathname) {
      history.replace(pathname);
      return;
    }

    const routingContext: RoutingContext = {
      app,
      dispatch: store.dispatch,
      firestore,
      pathname,
    };

    const page = await router.resolve(routingContext);

    renderPage(page);
  }

  function renderPage(page: Page) {
    const mountPoint = document.getElementById('root');

    ReactDOM.render(
      <HistoryProvider value={history}>
        <ThemeProvider theme={defaultTheme}>
          <Provider store={store}>
            <FirebaseAppProvider value={app}>
              <>
                <PageLoadingContainer page={page} />
                <ResetStyle />
              </>
            </FirebaseAppProvider>
          </Provider>
        </ThemeProvider>
      </HistoryProvider>,
      mountPoint,
    );
  }
}
