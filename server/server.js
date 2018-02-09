const express = require('express');
const app = express();
const api = require('./api/api');
const err = require('./middleware/error');

//Setup the middleware
require('./middleware/appMiddleware')(app); //This is just invoking the exported function with (app)

//Setup the API
app.use('/api', api);
//Setup global error handling
app.use(err());
// export the app for testing
module.exports = app;
