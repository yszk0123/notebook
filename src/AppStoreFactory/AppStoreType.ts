import { Store } from 'redux';
import { AppAction, AppState } from '../app/app-type';

export type AppStoreFactory = () => Store<AppState, AppAction>;
