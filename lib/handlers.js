/*
 * Define User Handlers
 */

// * Define the handlers
var handlers = {};

// * Users
handlers.users = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// * Container for the Users Submethods
handlers._users = {};

// * Users - post
// * Required Data: firstName, lastName, phone, password, tosAgreement
handlers._users.post = function(data, callback) {
  // * Check all the required fields are filled out
  var firstName =
    typeof data.payload.firstName == 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var phone =
    typeof data.payload.phone == 'string' &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  var password =
    typeof data.payload.password == 'string' &&
    data.payload.password.trim().length == 10
      ? data.payload.password.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement == 'boolean' &&
    data.payload.tosAgreement == true
      ? true
      : false;
};

// * Users - get
handlers._users.get = function(data, callback) {};

// * Users - put
handlers._users.put = function(data, callback) {};

// * Users - delete
handlers._users.delete = function(data, callback) {};

// * Ping handler
handlers.ping = function(data, callback) {
  // * callback a http code and payload object
  callback(200);
};

// * Not Found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = handlers;
