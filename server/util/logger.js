//no var needed, colors will attach to String.prototype
require('colors');
const _ = require('lodash');

const config = require('../config/config');
//create a no-op function for when logging is disabled
const noOp = () => {};
//check if logging is enabled
const consoleLog = config.logging ? console.log.bind(console) : noOp;

const logger = {
  log: function() {
    //arguments is an array like object with all the passed in args to this function
    const args = _.toArray(arguments)
      .map(function(arg) {
        if (typeof arg === 'object') {
          const string = JSON.stringify(arg, 2);
          return string.magenta;
        } else {
          //coerce the string to color
          arg+='';
          return arg.magenta;
        }
      });
    //call console.log or noop with console object as the context and the colored args
    consoleLog.apply(console, args);
  }
};

module.exports = logger;
