import { createAction, GetAction } from '../../redux';

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
