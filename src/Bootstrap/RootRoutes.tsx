import React from 'react';
import { NotFoundPage } from '../application/components/NotFoundPage';
import { Route } from '../application/routing';
import { counterRoutes } from '../OLD_pages/counter';
import { helloRoutes } from '../OLD_pages/hello';
import { loginRoutes } from '../OLD_pages/login';
import { wordRoutes } from '../OLD_pages/word';

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
