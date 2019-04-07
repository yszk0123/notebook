import firebase from 'firebase/app';
import { createBrowserHistory, Location } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import UniversalRouter from 'universal-router';
import { FirebaseAppProvider } from '../application/adapters/firebase/FirebaseAppContext';
import { Dispatch } from '../application/DucksType';
import { HistoryProvider } from '../application/HistoryContext';
import {
  Page,
  PageLoadingContainer,
  resolveRoute,
  RoutingContext,
  routingThunks,
} from '../application/routing';
import { ThemeProvider } from '../application/styled-components';
import { defaultTheme } from '../application/theme/DefaultTheme';
import { ResetStyle } from '../components/ResetStyle';
import { firebaseConfig } from '../config/firebaseConfig';
import { appRoutes } from './RootRoutes';
import { createStore } from './StoreFactory';

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

export async function bootstrap(): Promise<void> {
  const app = firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

  const router = new UniversalRouter(appRoutes, {
    baseUrl: process.env.APP_BASE_URL,
    resolveRoute,
  });
  const history = createBrowserHistory();
  const store = createStore({ db: firestore });
  const dispatch = store.dispatch as Dispatch;

  history.listen(onLocationChange);
  // tslint:disable-next-line:no-floating-promises
  onLocationChange(history.location);

  firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      return;
    }
    dispatch(routingThunks.login(user));
  });

  async function onLocationChange(location: Location): Promise<void> {
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

  function renderPage(page: Page): void {
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
