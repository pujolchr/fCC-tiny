const config = {};

config.db = {
  url: 'localhost',
  port: 27018,
  path: 'db',
  collection: 'tiny',
};

config.server = {
  url: 'http://localhost',
  port: 3000,
};
module.exports = config;
