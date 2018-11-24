import { AppContext } from '../app/app-type';
import { createAction, GetAction } from '../redux';

export interface Page {
  content: JSX.Element;
}

export interface Route {
  path: string;
  action(context: AppContext): Page | Promise<Page>;
}

export const enum RoutingActionType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

interface User {
  displayName: string;
  visitCount: number;
}

export const routingActions = {
  login: createAction(RoutingActionType.LOGIN, (user: User) => ({
    payload: { user },
  })),
  loginFailure: createAction(RoutingActionType.LOGIN_FAILURE),
};

export type RoutingAction = GetAction<typeof routingActions>;

export interface RoutingState {
  loading: boolean;
  user: User | null;
}
