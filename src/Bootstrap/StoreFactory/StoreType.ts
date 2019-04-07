import { Store } from 'redux';
import { AppInjections } from '../../app/ApplicationType';
import { Action } from '../../app/DucksType';
import { RootState } from '../RootState';

export type StoreFactory = (injections: AppInjections) => Store<RootState, Action<any, any>>;
