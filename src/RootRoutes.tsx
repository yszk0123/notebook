import React from 'react';
import { NotFoundPage } from './app/components/NotFoundPage';
import { counterRoutes } from './pages/counter';
import { helloRoutes } from './pages/hello';
import { loginRoutes } from './pages/login';
import { noteRoutes } from './pages/note';
import { wordRoutes } from './pages/word';
import { Route } from './routing/routing-type';

export const appRoutes: Array<Route> = [
  ...counterRoutes,
  ...helloRoutes,
  ...loginRoutes,
  ...noteRoutes,
  ...wordRoutes,
  {
    path: '(.*)',
    action(context) {
      return { content: <NotFoundPage /> };
    },
  },
];
