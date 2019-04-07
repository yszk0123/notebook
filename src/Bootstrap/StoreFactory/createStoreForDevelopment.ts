import { applyMiddleware, createStore } from 'redux';
// @ts-ignore
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AppInjections } from '../../application/ApplicationType';
import { rootReducer } from '../RootReducer';

export const createStoreForDevelopment = (injections: AppInjections) => {
  return createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(injections), logger));
};
