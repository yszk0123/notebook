import { Store } from 'redux';
import { AppInjections } from '../../application/ApplicationType';
import { Action } from '../../application/DucksType';
import { RootState } from '../RootState';

export type StoreFactory = (injections: AppInjections) => Store<RootState, Action<any, any>>;
