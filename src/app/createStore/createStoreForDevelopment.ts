import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
// @ts-ignore
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { restoreValueFromGlobalForDevelopment } from '../../utils/restoreValueFromGlobalForDevelopment';
import { AppAction, AppState } from '../app-type';
import { appReducer } from '../AppReducer';

declare global {
  interface Window {
    // tslint:disable-next-line:no-any
    module: any;
    // tslint:disable-next-line:no-any
    store: any;
  }
}

export function createStoreForDevelopment(): Store<AppState, AppAction> {
  /**
   * Workaround for HMR with parcel
   * @see https://github.com/parcel-bundler/parcel/issues/314#issuecomment-352276559
   */
  return restoreValueFromGlobalForDevelopment('store', () => {
    return createReduxStore(appReducer, applyMiddleware(thunk, logger));
  });
}

/**
 * HMR
 * @see https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
 */
// tslint:disable-next-line:no-any
if ((module as any).hot && window.store) {
  // tslint:disable-next-line:no-any
  (module as any).hot.accept(() => {
    window.store.replaceReducer(require('../AppReducer').appReducer);
  });
}
