import { Store } from 'redux';
import { AppAction, AppState } from '../app-type';

export let createStore: () => Store<AppState, AppAction> =
  process.env.NODE_ENV === 'development'
    ? require('./createStoreForDevelopment').createStoreForDevelopment
    : require('./createStoreForProduction').createStoreForProduction;
