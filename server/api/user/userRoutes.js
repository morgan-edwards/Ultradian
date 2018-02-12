const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const createRoutes = require('../../util/createRoutes');

//invoke util function to alter router
createRoutes(controller, router);

module.exports = router;
