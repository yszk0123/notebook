import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppAction, AppState } from '../app-type';
import { appReducer } from '../AppReducer';

export function createStoreForProduction(): Store<AppState, AppAction> {
  return createReduxStore(appReducer, applyMiddleware(thunk));
}
