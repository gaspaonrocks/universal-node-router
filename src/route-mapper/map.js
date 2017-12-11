'use strict';

module.exports = function (context, dirName) {
  const express = require('express');
  const router = express.Router();

  // modulesIndexer will look in the directory given
  // and list all the controller files to use 
  let modulesIndexer = require('../global-modules-indexer/index');
  let modulesIndex = modulesIndexer(context, dirName);

  // utils will help us build options to redirect the request
  // to either getCollection or getOne and keep the params
  let utils = require('../utils/utils');

  const RoutesMapping = {
    'GET': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      utils.hasReqParams(path) ?
        router.get(options.url, (req, res, next) => { return modulesIndex[ctrl].find(req, res, next); }) :
        router.get(path, (req, res, next) => { return modulesIndex[ctrl].list(req, res, next); });
    },
    'POST': function (router, path) {
      let ctrl = path.replace('/', '');
      
      router.post(path, (req, res, next) => {
        return modulesIndex[ctrl].create(req, res, next);
      })
    },
    'PUT': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      router.put(options.url, (req, res, next) => {
        return modulesIndex[ctrl].update(req, res, next);
      })
    },
    'PATCH': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      router.patch(options.url, (req, res, next) => {
        return modulesIndex[ctrl].update(req, res, next);
      })
    },
    'DELETE': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      router.delete(options.url, (req, res, next) => {
        return modulesIndex[ctrl].delete(req, res, next);
      })
    }
  }

  router.all('*', (req, res, next) => {
    RoutesMapping[req.method](router, req.path);
    next();
  });

  return router;
}