import firebase from 'firebase/app';
import { Thunk } from '../DucksType';
import { loginGateway } from './gateways/UserGateway';
import { RoutingAction, routingActions } from './RoutingActions';
import { RoutingGlobalState } from './RoutingState';

type RoutingThunk<Payload> = Thunk<RoutingGlobalState, Payload, RoutingAction>;

const login: RoutingThunk<firebase.User> = firebaseUser => async (
  dispatch,
  _getState,
  injections,
) => {
  const user = await loginGateway(firebaseUser, injections);
  if (!user) {
    dispatch(routingActions.loginFailure());
    return;
  }

  dispatch(routingActions.login(user));
};

export const routingThunks = { login };
