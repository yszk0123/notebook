import { Nullable } from 'option-t/lib/Nullable';
import { AppRoutingContext } from '../app/app-type';
import { createAction, GetAction } from '../redux';

export interface Page {
  loading?: JSX.Element;
  content: JSX.Element;
}

export interface Route {
  children?: Array<Route>;
  path: string;
  title?: string;
  action?(context: AppRoutingContext): Page | Promise<Page>;
}

export const enum RoutingActionType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

interface User {
  displayName: string;
  visitCount: number;
  uid: string;
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
  user: Nullable<User>;
}
