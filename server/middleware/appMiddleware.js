const morgan = require('morgan');
const bodyParser = require('body-parser');

//Sets up global middleware
module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
