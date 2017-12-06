'use strict';

// import both function
let mapper = require('./src/route-mapper/map');
let indexer = require('./src/controller-manager/index');

// this will keep the context of our server as intern variable
function Router(context) {
    this.context = context;
};

// define a function as prototype property
Router.prototype.mapper = function (dirPath) {
    return mapper(this.context, dirPath);
};

Router.prototype.indexer = function (dirPath) {
    return indexer(this.context, dirPath);
};

module.exports = Router;