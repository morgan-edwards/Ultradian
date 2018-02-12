const _ = require('lodash');
const Task = require('./taskModel');

exports.params = function(req, res, next, id) {
  //use id to attach task to req
  Task.findById(id)
    .populate('user categories') // populates these fields with the actual objects
    .exec() //Mongoose exec explicitly returns a promise
    .then(function(task) {
      if (!task) {
        next(new Error('No task with that id'));
      } else {
        req.task = task;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Task.find({}) //empty object isn't necessary, but makes it explicit
    .populate('user categories') // populates these fields with the actual objects
    .exec() //Mongoose exec explicitly returns a promise
    .then(function(tasks) {
      res.json(tasks);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const task = req.task;
  res.json(task);
};

exports.put = function(req, res, next) {
  let task = req.task;
  const update = req.body;

  _.merge(task, update);

  task.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function(req, res, next) {
  const newTask = req.body;

  Task.create(newTask)
    .then(function(task) {
      res.json(task);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.task.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
