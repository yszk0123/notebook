import { Store } from 'redux';
import { RootState } from '../RootState';

export type StoreFactory = () => Store<RootState, any>;
