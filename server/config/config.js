const _ = require('lodash');

//default config for the api
const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000
};
//check if the NODE_ENV was set, if not, set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
//set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

let envConfig;
// require could error if the file doesn't exist, so here is a safety pattern
// try-catch will attempt block, but move on to the catch if an error is throw
// remove for production!!!
try {
  envConfig = require(`./${config.env}`);
  envConfig = envConfig || {}; // make sure the config is properly exported
} catch(e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
