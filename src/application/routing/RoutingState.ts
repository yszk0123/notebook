import { Nullable } from 'option-t/lib/Nullable';
import { RoutingUser } from './RoutingType';

export interface RoutingState {
  loading: boolean;
  user: Nullable<RoutingUser>;
}

export interface RoutingGlobalState {
  routing: RoutingState;
}
