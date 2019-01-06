import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import {
  ActionContext,
  Params,
  Route as UniversalRouterRoute,
} from 'universal-router';
import { appConfig } from '../../config/AppConfig';
import { unwrapUnsafeValue } from '../../utils/unwrapUnsafeValue';
import { Route, RoutingContext } from './routing-type';

interface Context
  extends ActionContext<RoutingContext, unknown>,
    RoutingContext {}

function onEnterRoute(context: Context) {
  const route = unwrapUnsafeValue<UniversalRouterRoute & Route>(context.route);

  document.title = unwrapOrFromUndefinable(route.title, appConfig.title);
}

export function resolveRoute(context: Context, params: Params) {
  if (typeof context.route.action === 'function') {
    onEnterRoute(context);
    return context.route.action(context, params);
  }
  return undefined;
}
