import { unwrapOrElseFromUndefinable } from 'option-t/lib/Undefinable/unwrapOrElse';
import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
// @ts-ignore
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AppAction, AppState } from '../app-type';
import { appReducer } from '../AppReducer';

declare global {
  interface Window {
    store: any;
    module: any;
  }
}

export function createStoreForDevelopment(): Store<AppState, AppAction> {
  /**
   * Workaround for HMR with parcel
   * @see https://github.com/parcel-bundler/parcel/issues/314#issuecomment-352276559
   */
  const store = unwrapOrElseFromUndefinable(window.store, () => {
    return createReduxStore(appReducer, applyMiddleware(thunk, logger));
  });

  window.store = store;

  return store;
}

/**
 * HMR
 * @see https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
 */
if ((module as any).hot && window.store) {
  (module as any).hot.accept(() => {
    window.store.replaceReducer(require('../AppReducer').appReducer);
  });
}
