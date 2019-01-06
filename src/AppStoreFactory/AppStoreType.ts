import { Store } from 'redux';
import { AppState } from '../AppState';

export type AppStoreFactory = () => Store<AppState, any>;
