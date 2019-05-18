import React from 'react';
import { NotFoundPage } from '../application/components/NotFoundPage';
import { Route } from '../application/routing';
import { counterRoutes } from '../pages/counter';
import { helloRoutes } from '../pages/hello';
import { loginRoutes } from '../pages/login';
import { wordRoutes } from '../pages/word';

export const appRoutes: Route[] = [
  ...counterRoutes,
  ...helloRoutes,
  ...loginRoutes,
  ...wordRoutes,
  {
    path: '(.*)',
    action(context) {
      return { content: <NotFoundPage /> };
    },
  },
];
