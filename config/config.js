const secret = require('./secret');

const config = {};

config.mlab = `mongodb://${secret.user}:${secret.password}@ds141284.mlab.com:41284/tiny`;
config.db = {
  url: 'localhost',
  port: 27018,
  path: 'db',
  collection: 'tiny',
};

config.server = {
  url: 'http://localhost:3000',
};

module.exports = config;
