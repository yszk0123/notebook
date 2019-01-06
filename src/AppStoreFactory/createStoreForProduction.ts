import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../AppReducer';
import { AppStoreFactory } from './AppStoreType';

export const createStoreForProduction: AppStoreFactory = () => {
  return createReduxStore(appReducer, applyMiddleware(thunk));
};
