require('@babel/polyfill');
require('@babel/register');

const app = require('./app').default;
app(process.argv[2])
  .then(console.log)
  .catch(console.log);
