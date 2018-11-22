import * as firebase from 'firebase/app';
import React from 'react';
import { Hello } from './pages/hello';
import { Login } from './pages/login';
import { NotFound } from './pages/not-found';
import { AppDispatch } from './store/app/app-type';

interface Context {
  app: firebase.app.App;
  pathname: string;
  dispatch: AppDispatch;
}

interface Page {
  content: JSX.Element;
}

interface Route {
  path: string;
  action(context: Context): Page | Promise<Page>;
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
        content: <div />,
      };
    },
  },
  {
    path: '/login',
    async action(context) {
      return {
        content: <Login />,
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
