/*
 * Create and Export configuration variables
 */

// * Container for all environments
var environments = {};

// * staging Environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging'
};

// * production Environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production'
};

// * determine which environment was passed as a command-line argument
var currentEnvironment =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// * Check current environment
var environmentToExport =
  typeof environments[currentEnvironment] == 'object'
    ? environments[currentEnvironment]
    : environments.staging;

// * Export the module
module.exports = environmentToExport;
