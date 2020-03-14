/*
 * Primary File for the API
 *
 */

// * Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

// ******************* The HTTP Server should respond to all requests with string
const httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

// * Start the HTTP server
httpServer.listen(config.httpPort, function() {
  console.log('This server is listening on Port: ' + config.httpPort);
});

// ****************** The HTTPS Server should respond to all requests with string
var httpServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpServerOptions, function(req, res) {
  unifiedServer(req, res);
});

// * StartS the HTTPS server
httpsServer.listen(config.httpsPort, function() {
  console.log('This server is listening on Port: ' + config.httpsPort);
});

// ****************** Unified Server Logic
var unifiedServer = function(req, res) {
  // * Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // * Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // * Get Query String Object
  const queryStringObject = parsedUrl.query;

  // * Get the HTTP Method
  const method = req.method.toLowerCase();

  // * Get headers with the request
  const headers = req.headers;

  // * Get stream payload in req
  const decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });

  req.on('end', function() {
    buffer += decoder.end();

    // * Choose the handler this request should go to
    var chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // * Construct the data object to send to the handler
    var data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };

    // * Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      // * Use the status code called back by the handler or default
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      // * Use the status code called back by the handler or default
      payload = typeof payload == 'object' ? payload : {};

      // * Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // * Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // * Log the Request Path
      console.log('Returning the response: ', statusCode, payloadString);
    });
  });
};

// * Define the handlers
var handlers = {};

// * Sample handler
handlers.sample = function(data, callback) {
  // * callback a http code and payload object
  callback(406, { name: 'Sample Handler' });
};

// * Not Found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// * Define the request Router
var router = {
  sample: handlers.sample
};
