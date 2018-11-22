import React from 'react';
import { Counter } from './pages/counter';
import { Hello } from './pages/hello';
import { NotFound } from './pages/not-found';

interface Context {
  pathname: string;
}

interface Page {
  content: JSX.Element;
}

interface Route {
  path: string;
  action(context: Context): Page;
}

export const routes: Route[] = [
  {
    path: '',
    action(context) {
      return {
        content: <Hello />,
      };
    },
  },
  {
    path: '/counter',
    action(context) {
      return {
        content: <Counter />,
      };
    },
  },
  {
    path: '(.*)',
    action(context) {
      return { content: <NotFound /> };
    },
  },
];
