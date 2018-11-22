import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppAction, appReducer } from './app/App';
import { AppState } from './app/AppType';

declare global {
  interface Window {
    store: any;
    module: any;
  }
}

export function createStore(): Store<AppState, AppAction> {
  /**
   * Workaround for HMR with parcel
   * @see https://github.com/parcel-bundler/parcel/issues/314#issuecomment-352276559
   */
  const store = (() => {
    if (process.env.NODE_ENV === 'development' && window.store) {
      return window.store;
    }
    const store = createReduxStore(appReducer, applyMiddleware(thunk));
    if (process.env.NODE_ENV === 'development') {
      window.store = store;
    }
    return store;
  })();

  return store;
}

/**
 * HMR
 * @see https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
 */
if (
  process.env.NODE_ENV === 'development' &&
  (module as any).hot &&
  window.store
) {
  (module as any).hot.accept(() => {
    console.log('replaced!');
    window.store.replaceReducer(require('./app/App').appReducer);
  });
}
