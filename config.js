/*
 * Create and Export configuration variables
 */

// * Container for all environments
var environments = {};

// * staging Environment
environments.staging = {
  port: 3000,
  envName: 'staging'
};

// * production Environment
environments.production = {
  port: 5000,
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
