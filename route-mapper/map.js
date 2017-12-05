'use strict';

module.exports = function (dirName) {
  const express = require('express');
  const router = express.Router();

  let indexCtrlListing = require('../controller-manager/index');
  let indexCtrl = indexCtrlListing(dirName);

  const RoutesMapping = {
    'GET': function (router, path) {
      let ctrl = path.replace('/', '');
      router.get(path, (req, res, next) => {
        return indexCtrl[ctrl].list(req, res, next);
      })
    },
    'POST': function (router, path) {
      let ctrl = path.replace('/', '');
      router.post(path, (req, res, next) => {
        return indexCtrl[ctrl].create(req, res, next);
      })
    },
    'PUT': function (router, path) {
      let ctrl = path.replace('/', '');
      router.put(path, (req, res, next) => {
        return indexCtrl[ctrl].update(req, res, next);
      })
    },
    'PATCH': function (router, path) {
      let ctrl = path.replace('/', '');
      router.patch(path, (req, res, next) => {
        return indexCtrl[ctrl].update(req, res, next);
      })
    },
    'DELETE': function (router, path) {
      let ctrl = path.replace('/', '');
      router.delete(path, (req, res, next) => {
        return indexCtrl[ctrl].delete(req, res, next);
      })
    }
  }

  //console.log(RoutesMapping);

  router.all('*', (req, res, next) => {
    RoutesMapping[req.method](router, req.path);
    next();
  });

  return router;
}