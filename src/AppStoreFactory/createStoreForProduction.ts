import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../../AppReducer';
import { AppAction, AppState } from '../app-type';

export function createStoreForProduction(): Store<AppState, AppAction> {
  return createReduxStore(appReducer, applyMiddleware(thunk));
}
