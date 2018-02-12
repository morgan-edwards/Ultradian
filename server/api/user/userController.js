const _ = require('lodash');
const User = require('./userModel');

exports.params = function(req, res, next, id) { //this is a middleware before the routes
  User.findById(id)
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .then(function(users) {
      res.json(users);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const user = req.user;
  res.json(user);
};

exports.put = function(req, res, next) {
  const user = req.user;
  const update = req.body;
  _.merge(user, update);
  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function(req, res, next) {
  const newUser = req.body;

  User.create(newUser)
    .then(function(user) {
      res.json(user);
    }, function(err){
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
      if (err) {
        next(err);
      } else {
        res.json(removed);
      }
  });
};
