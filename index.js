/*
 * Primary File for the API
 *
 */

// * Dependencies
const http = require("http");

// * The Server should respond to all requests with string
const server = http.createServer(function(req, res) {
  res.end("Hello World\n");
});

// * Start the server and have it listen on port 3000
server.listen(3000, function() {
  console.log("This server is listening on Port: 3000");
});
