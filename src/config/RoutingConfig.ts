import { appConfig } from './AppConfig';

export const routingPaths = {
  home: `${appConfig.baseUrl}`,
  counter: `${appConfig.baseUrl}/counter`,
  login: `${appConfig.baseUrl}/login`,
  logout: `${appConfig.baseUrl}/logout`,
  hello: `${appConfig.baseUrl}/hello`,
  notFound: `${appConfig.baseUrl}/not-found`,
  redirect: `${appConfig.baseUrl}/redirect`,
};
