import { RoutingGlobalState } from '../application/routing';
import { CounterGlobalState } from '../OLD_pages/counter';
import { WordGlobalState } from '../OLD_pages/word';

export interface RootState extends RoutingGlobalState, WordGlobalState, CounterGlobalState {}
