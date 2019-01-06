import { Store } from 'redux';
import { AppState } from '../app/app-type';

export type AppStoreFactory = () => Store<AppState, any>;
