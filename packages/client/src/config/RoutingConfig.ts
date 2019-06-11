import { appConfig } from './AppConfig';

export const routingPaths = {
  counter: `${appConfig.baseUrl}/counter`,
  hello: `${appConfig.baseUrl}/hello`,
  home: `${appConfig.baseUrl}`,
  login: `${appConfig.baseUrl}/login`,
  logout: `${appConfig.baseUrl}/logout`,
  notFound: `${appConfig.baseUrl}/not-found`,
  redirect: `${appConfig.baseUrl}/redirect`,
  word: `${appConfig.baseUrl}/word`,
};
