require('@babel/polyfill');
require('@babel/register');

const app = require('./app').default;
const result = app('01b')
  .then(console.log)
  .catch(console.log);
