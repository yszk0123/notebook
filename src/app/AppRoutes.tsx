import React from 'react';
import { counterRoutes } from '../pages/counter';
import { helloRoutes } from '../pages/hello';
import { loginRoutes } from '../pages/login';
import { Route } from '../routing/routing-type';
import { NotFound } from './components/NotFound';

export const appRoutes: Route[] = [
  ...helloRoutes,
  ...counterRoutes,
  ...loginRoutes,
  {
    path: '(.*)',
    action(context) {
      return { content: <NotFound /> };
    },
  },
];
