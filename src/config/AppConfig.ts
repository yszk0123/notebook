const HASURA_GRAPHQL_HOST = process.env.HASURA_GRAPHQL_HOST || '';

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';

export const appConfig = {
  appTokenStorageKey: 'NOTEBOOK_APP_TOKEN',
  baseUrl: process.env.APP_BASE_URL || '',
  hasura: {
    endpoints: {
      graphql: `https://${HASURA_GRAPHQL_HOST}/v1/graphql`,
      graphqlSubscription: `wss://${HASURA_GRAPHQL_HOST}/v1/graphql`,
    },
  },
  title: 'Notebook',
};
