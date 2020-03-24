/*
 * Helpers for various tasks
 */

// * Dependencies
var crypto = require('crypto');
var config = require('../config');

// * Container for all types of helpers
var helpers = {};

// * create a SHA256 hash
helpers.hash = function(str) {
  if (typeof str == 'string' && str.length > 0) {
    return crypto
      .createHmac('sha256', config.hashingSecret)
      .update(str)
      .digest('hex');
  }
};

// * Export the modules
module.exports = helpers;
