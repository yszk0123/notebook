import { RoutingGlobalState } from '../application/routing';
import { CounterGlobalState } from '../pages/counter';
import { WordGlobalState } from '../pages/word';

export interface RootState extends RoutingGlobalState, WordGlobalState, CounterGlobalState {}
