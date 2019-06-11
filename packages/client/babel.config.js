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
            'FIREBASE_API_KEY',
            'FIREBASE_APP_ID',
            'FIREBASE_MESSAGING_SENDER_ID',
            'FIREBASE_PROJECT_ID',
            'HASURA_GRAPHQL_HOST',
            'FACEBOOK_APP_ID',
          ],
        },
      ],
    ],
  };
};
