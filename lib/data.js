/*
 * File to Store and maintain data
 */

var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// * Container for the Module to be exported
var lib = {};

// * Base directory of the folder
lib.baseDir = path.join(__dirname, '/../.data/');

// * Write data to a file
lib.create = function(dir, file, data, callback) {
  // * Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      // * Convert data to string
      var stringData = JSON.stringify(data);

      // * Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error Closing the file');
            }
          });
        } else {
          callback('Could not write to new file');
        }
      });
    } else {
      callback('Could not create new file, It may already exists');
    }
  });
};

// * Read Data from a file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(
    err,
    data
  ) {
    if (!err && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// * Update data of a file
lib.update = function(dir, file, data, callback) {
  // * Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      // * Convert data to string
      var stringData = JSON.stringify(data);

      // * Truncate data
      fs.ftruncate(fileDescriptor, function(err) {
        if (!err) {
          // * Write to file and close it
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error Closing the file');
                }
              });
            } else {
              callback('Could not write to new file');
            }
          });
        } else {
          callback('Error truncating Data');
        }
      });
    } else {
      callback('Could not Open the file, It may not exist yet');
    }
  });
};

// * Delete a file
lib.delete = function(dir, file, callback) {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err) {
    if (!err) {
      callback(false);
    } else {
      callback('Error Deleting file');
    }
  });
};

// * Export Container
module.exports = lib;
