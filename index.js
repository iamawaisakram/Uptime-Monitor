/*
 * Primary File for the API
 *
 */

// * Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// * The Server should respond to all requests with string
const server = http.createServer(function(req, res) {
  // * Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // * Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // * Get Query String Object
  const queryStringObject = parsedUrl.query;

  // * Get the HTTP Method
  const method = req.method.toLowerCase();

  // * Get headers with the request
  const headers = req.headers;

  // * Get stream payload in req
  const decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });

  req.on("end", function() {
    buffer += decoder.end();

    // * Send the response
    res.end("Hello World\n");

    // * Log the Request Path
    console.log("Request Received with Payload..: ", buffer);
  });
});

// * Start the server and have it listen on port 3000
server.listen(3000, function() {
  console.log("This server is listening on Port: 3000");
});
