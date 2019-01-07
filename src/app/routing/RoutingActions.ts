import { createAction } from '../redux';
import { RoutingUser } from './RoutingType';

export const enum RoutingActionType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

interface LoginPayload {
  user: RoutingUser;
}
interface Login {
  type: RoutingActionType.LOGIN;
  payload: LoginPayload;
}
function login(user: RoutingUser): Login {
  return {
    payload: { user },
    type: RoutingActionType.LOGIN,
  };
}

interface LoginFailure {
  type: RoutingActionType.LOGIN_FAILURE;
}
const loginFailure = createAction(RoutingActionType.LOGIN_FAILURE);

export const routingActions = {
  login,
  loginFailure,
};

export type RoutingAction = Login | LoginFailure;
