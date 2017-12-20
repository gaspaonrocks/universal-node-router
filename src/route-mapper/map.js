'use strict';

module.exports = function (context, dirName) {
  const express = require('express');
  const router = express.Router();

  // error handler
  let ErrorHandler = require('./error-handler');

  // indecCtrlListing will look in the directory given
  // and list all the controller files to use 
  let indexCtrlListing = require('../global-modules-indexer/index');
  let indexCtrl = indexCtrlListing(context, dirName);

  // utils will help us build options to redirect the request
  // to either getCollection or getOne and keep the params
  let utils = require('../utils/utils');

  const RoutesMapping = {
    'GET': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      if (indexCtrl[ctrl] != null) {
        utils.hasReqParams(path) ?
          router.get(options.url, (req, res, next) => {
            if (ErrorHandler.errorChecker(indexCtrl[ctrl].find, 'controller')) res.status(500).send(ErrorHandler.result);
            else return indexCtrl[ctrl].find(req, res, next);
          }) :
          router.get(path, (req, res, next) => {
            if (ErrorHandler.errorChecker(indexCtrl[ctrl].list, 'controller')) res.status(500).send(ErrorHandler.result);
            else return indexCtrl[ctrl].list(req, res, next);
          });
      }
    },
    'POST': function (router, path) {
      let ctrl = path.replace('/', '');

      if (indexCtrl[ctrl] != null) {
        router.post(path, (req, res, next) => {
          if (ErrorHandler.errorChecker(indexCtrl[ctrl].create, 'controller')) res.status(500).send(ErrorHandler.result);
          else return indexCtrl[ctrl].create(req, res, next);
        })
      }
    },
    'PUT': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      if (indexCtrl[ctrl] != null) {
        router.put(options.url, (req, res, next) => {
          if (ErrorHandler.errorChecker(indexCtrl[ctrl].update, 'controller')) res.status(500).send(ErrorHandler.result);
          else return indexCtrl[ctrl].update(req, res, next);
        })
      }
    },
    'PATCH': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      if (indexCtrl[ctrl] != null) {
        router.patch(options.url, (req, res, next) => {
          if (ErrorHandler.errorChecker(indexCtrl[ctrl].update, 'controller')) res.status(500).send(ErrorHandler.result);
          else return indexCtrl[ctrl].update(req, res, next);
        })
      }
    },
    'DELETE': function (router, path) {
      let options = utils.options(path);
      let ctrl = options.ctrl;

      if (indexCtrl[ctrl] != null) {
        router.delete(options.url, (req, res, next) => {
          if (ErrorHandler.errorChecker(indexCtrl[ctrl].delete, 'controller')) res.status(500).send(ErrorHandler.result);
          else return indexCtrl[ctrl].delete(req, res, next);
        })
      }
    }
  }

  router.all('*', (req, res, next) => {
    if (ErrorHandler.errorChecker(RoutesMapping[req.method], 'mapper')) {
      res.status(500).send(ErrorHandler.result);
    } else {
      RoutesMapping[req.method](router, req.path);
      next();
    }
  });

  return router;
}