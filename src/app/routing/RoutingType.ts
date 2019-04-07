import { Dispatch } from 'redux';

export interface Page {
  loading?: JSX.Element;
  content: JSX.Element;
}

export interface RoutingContext {
  app: firebase.app.App;
  firestore: firebase.firestore.Firestore;
  pathname: string;
  dispatch: Dispatch;
}

export interface Route {
  children?: Route[];
  path: string;
  title?: string;
  action?(context: RoutingContext): Page | Promise<Page>;
}

export interface RoutingUser {
  displayName: string;
  visitCount: number;
  uid: string;
}
