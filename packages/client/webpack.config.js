// const path = require('path');
const config = require('@expo/webpack-config');

// const includePath = name => path.resolve('node_modules', name);

module.exports = function(env, ...args) {
  const c = config(env, ...args);

  // const fontLoaderRule = c.module.rules[1].oneOf.find(
  //   rule => Array.isArray(rule.use) && rule.use.some(e => e.loader === 'url-loader'),
  // );
  // fontLoaderRule.use[0].options.limit = 1000 * 1000;
  // fontLoaderRule.include.push(includePath('native-base'));

  return c;
};
