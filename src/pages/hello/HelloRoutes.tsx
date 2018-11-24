import React from 'react';
import { Route } from '../../routing/routing-type';
import { Hello } from './components/Hello';

export const helloRoutes: Route[] = [
  {
    path: '',
    action(context) {
      return {
        content: <Hello />,
      };
    },
  },
];
