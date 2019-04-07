// tslint:disable:no-var-requires
import { StoreFactory } from './StoreType';

export let createStore: StoreFactory =
  process.env.NODE_ENV === 'development'
    ? require('./createStoreForDevelopment').createStoreForDevelopment
    : require('./createStoreForProduction').createStoreForProduction;
