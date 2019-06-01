module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
      [
        'babel-plugin-transform-inline-environment-variables',
        {
          include: [
            'NODE_ENV',
            'APP_BASE_URL',
            'APP_TITLE',
            'FIREBASE_API_KEY',
            'FIREBASE_AUTH_DOMAIN',
            'FIREBASE_DATABASE_URL',
            'FIREBASE_PROJECT_ID',
            'FIREBASE_STORAGE_BUCKET',
            'FIREBASE_MESSAGING_SENDER_ID',
            'FIREBASE_APP_ID',
            'HASURA_GRAPHQL_ENDPOINT',
            'HASURA_GRAPHQL_SUBSCRIPTION_ENDPOINT',
          ],
        },
      ],
    ],
  };
};
