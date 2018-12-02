import React from 'react';
import { counterRoutes } from '../pages/counter';
import { helloRoutes } from '../pages/hello';
import { loginRoutes } from '../pages/login';
import { noteRoutes } from '../pages/note';
import { Route } from '../routing/routing-type';
import { NotFoundPage } from './components/NotFoundPage';

export const appRoutes: Route[] = [
  ...counterRoutes,
  ...helloRoutes,
  ...loginRoutes,
  ...noteRoutes,
  {
    path: '(.*)',
    action(context) {
      return { content: <NotFoundPage /> };
    },
  },
];
