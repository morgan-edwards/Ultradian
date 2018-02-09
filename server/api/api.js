const router = require('express').Router();
//api router will mount other routers for all our resources. Each resource
//directory has a resourceRoutes.js file with the router ready to go, just
//require and mount them respective to routes below

router.use('/users', require('./user/userRouter')); //save keystrokes by just requiring inline
router.use('/categories', require('./category/categoryRouter'));
router.use('/tasks', require('./task/taskRouter'));

module.exports = router;
