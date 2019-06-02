export const appConfig = {
  appTokenStorageKey: 'NOTEBOOK_APP_TOKEN',
  baseUrl: process.env.APP_BASE_URL || '',
  hasura: {
    endpoints: {
      graphql: process.env.HASURA_GRAPHQL_ENDPOINT || '',
      graphqlSubscription: process.env.HASURA_GRAPHQL_SUBSCRIPTION_ENDPOINT || '',
    },
  },
  title: 'Notebook',
};
