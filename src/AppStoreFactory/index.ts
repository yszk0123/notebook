// tslint:disable:no-var-requires
import { AppStoreFactory } from './AppStoreType';

export let createStore: AppStoreFactory =
  process.env.NODE_ENV === 'development'
    ? require('./createStoreForDevelopment').createStoreForDevelopment
    : require('./createStoreForProduction').createStoreForProduction;
