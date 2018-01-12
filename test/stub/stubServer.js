'use strict';

let express = require('express');
let bodyParser = require('body-parser');

// Import Router constructor
let Router = require('../../index');
// create custom config
let customConfig = {
  getAll: 'listAll',
  getOne: 'findOne'
};
// Instantiate new Router object with the context as parameter
let router = new Router(__dirname, customConfig);

// Create an Express application
let app = express();

module.exports = function () {
  // Tell Express that messages bodies will be JSON formatted
  app.use(bodyParser.json());
  // Only parses urlencoded bodies (gzip and deflate enabled)
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // Set web service routes with controller directory
  app.use('/test', router.mapper('../mocks'));

  // Unknown route handler
  app.use((req, res) => {
    res.status(404).send('The requested page doesn\'t exist!');
  });

  // Errors handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err);
  });

  const port = 8181;

  // Finally, create the HTTP server
  return app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
}