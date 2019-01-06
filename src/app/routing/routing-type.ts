import { Nullable } from 'option-t/lib/Nullable';
import { Dispatch } from 'redux';
import { createAction, GetAction } from '../redux';

export interface Page {
  loading?: JSX.Element;
  content: JSX.Element;
}

export interface RoutingContext {
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;
  pathname: string;
  dispatch: Dispatch;
}

export interface Route {
  children?: Array<Route>;
  path: string;
  title?: string;
  action?(context: RoutingContext): Page | Promise<Page>;
}

export const enum RoutingActionType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

export interface RoutingUser {
  displayName: string;
  visitCount: number;
  uid: string;
}

export const routingActions = {
  login: createAction(RoutingActionType.LOGIN, (user: RoutingUser) => ({
    payload: { user },
  })),
  loginFailure: createAction(RoutingActionType.LOGIN_FAILURE),
};

export type RoutingAction = GetAction<typeof routingActions>;

export interface RoutingState {
  loading: boolean;
  user: Nullable<RoutingUser>;
}

export interface RoutingGlobalState {
  routing: RoutingState;
}
