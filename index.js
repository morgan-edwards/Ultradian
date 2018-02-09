//Entry point to the server
//Setup the config by requiring it
const config = require('./server/config/config');
const app = require('./server/server');
//logger is a wrapper around console.log that adds colors
//logs objects as json and can be conditionally turned off so you don't
//have to delete all calls to logger
const logger = require('./server/util/logger');

app.listen(config.port);
logger.log(`listening on http://localhost:${config.port}`);
