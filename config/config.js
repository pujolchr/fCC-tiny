const secret = require('./secret');

const config = {};

config.mlab = `mongodb://${secret.user}:${secret.password}@ds141284.mlab.com:41284/tiny`;
config.collection = 'tiny';
config.server = 'http://localhost:3000';

module.exports = config;
