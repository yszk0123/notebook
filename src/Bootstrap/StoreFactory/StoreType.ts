import { Store } from 'redux';
import { Action } from '../../app/redux';
import { AppInjections } from '../../app/type';
import { RootState } from '../RootState';

export type StoreFactory = (injections: AppInjections) => Store<RootState, Action<any, any>>;
