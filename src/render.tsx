import { Location } from 'history';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import UniversalRouter from 'universal-router';
import { GlobalNavigation } from './GlobalNavigation';
import { GlobalStyle } from './GlobalStyle';
import { HistoryProvider } from './HistoryContext';
import { routes } from './routes';
import { createStore } from './store/createStore';
import { ThemeProvider } from './styled-components';
import { theme } from './theme';

export async function render() {
  const router = new UniversalRouter(routes);
  const history = createHistory();

  const store = createStore();

  history.listen(onLocationChange);
  onLocationChange(history.location);

  async function onLocationChange(location: Location) {
    const { content } = await router.resolve(location);
    renderWithContent(content);
  }

  function renderWithContent(content: JSX.Element) {
    const mountPoint = document.getElementById('root');

    ReactDOM.render(
      <HistoryProvider value={history}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <>
              <GlobalNavigation />
              {content}
              <GlobalStyle />
            </>
          </Provider>
        </ThemeProvider>
      </HistoryProvider>,
      mountPoint,
    );
  }
}
