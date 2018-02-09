const router = require('express').Router();
const logger = require('../../util/logger');

// sets boilerplate route to satisfy a request
router.route('/')
  .get(function(req, res) {
    logger.log('Hey from task!!');
    res.send({ ok: true });
  });

module.exports = router;
