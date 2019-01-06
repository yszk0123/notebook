import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../RootReducer';
import { StoreFactory } from './StoreType';

export const createStoreForProduction: StoreFactory = () => {
  return createReduxStore(rootReducer, applyMiddleware(thunk));
};
