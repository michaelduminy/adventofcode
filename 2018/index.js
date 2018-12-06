require('@babel/polyfill');
require('@babel/register');

const app = require('./app').default;
const result = app('02b')
  .then(console.log)
  .catch(console.log);
