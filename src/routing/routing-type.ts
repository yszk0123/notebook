import { AppContext } from '../app/app-type';
import { createAction, GetAction } from '../redux';

export interface Page {
  content: JSX.Element;
}

export interface Route {
  path: string;
  action(context: AppContext): Page | Promise<Page>;
}

export const enum GlobalActionType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

interface User {
  displayName: string;
  visitCount: number;
}

export const globalActions = {
  login: createAction(GlobalActionType.LOGIN, (user: User) => ({
    payload: { user },
  })),
  loginFailure: createAction(GlobalActionType.LOGIN_FAILURE),
};

export type GlobalAction = GetAction<typeof globalActions>;

export interface GlobalState {
  loading: boolean;
  user: User | null;
}
