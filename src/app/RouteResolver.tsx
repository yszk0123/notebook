import { isNotUndefined } from 'option-t/lib/Undefinable';
import {
  ActionContext,
  Params,
  Route as UniversalRouterRoute,
} from 'universal-router';
import { Route } from '../routing/routing-type';
import { unwrapUnsafeValue } from '../utils/unwrapUnsafeValue';
import { AppContext } from './app-type';

type Context = ActionContext<AppContext, unknown> & AppContext;

function onEnterRoute(context: Context) {
  const route = unwrapUnsafeValue<UniversalRouterRoute & Route>(context.route);

  if (isNotUndefined(route.title)) {
    document.title = route.title;
  }
}

export function resolveRoute(context: Context, params: Params) {
  if (typeof context.route.action === 'function') {
    onEnterRoute(context);
    return context.route.action(context, params);
  }
  return undefined;
}
