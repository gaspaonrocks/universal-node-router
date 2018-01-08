"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../global-modules-indexer/index");
var utils_1 = require("../utils/utils");
var error_handler_1 = require("../utils/error-handler");
function default_1(context, config, dirName) {
    var router = express_1.Router();
    var modulesIndex = index_1.default(context, dirName);
    var utils = utils_1.default;
    var handler = new error_handler_1.default();
    var RoutesMapping = {
        'GET': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                utils.hasReqParams(path) ?
                    router.get(options.url, function (req, res, next) {
                        if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('getOne')], 'controller'))
                            res.status(500).send(handler.result);
                        else
                            return modulesIndex[ctrl][config.getMethod('getOne')](req, res, next);
                    }) :
                    router.get(path, function (req, res, next) {
                        if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('getAll')], 'controller'))
                            res.status(500).send(handler.result);
                        else
                            return modulesIndex[ctrl][config.getMethod('getAll')](req, res, next);
                    });
            }
        },
        'POST': function (router, path) {
            var ctrl = path.replace('/', '');
            if (modulesIndex[ctrl] != null) {
                router.post(path, function (req, res, next) {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('post')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('post')](req, res, next);
                });
            }
        },
        'PUT': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.put(options.url, function (req, res, next) {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('update')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('update')](req, res, next);
                });
            }
        },
        'PATCH': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.patch(options.url, function (req, res, next) {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('update')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('update')](req, res, next);
                });
            }
        },
        'DELETE': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.delete(options.url, function (req, res, next) {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('delete')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('delete')](req, res, next);
                });
            }
        }
    };
    router.all('*', function (req, res, next) {
        if (handler.errorChecker(RoutesMapping[req.method], 'mapper')) {
            res.status(500).json(handler.result);
        }
        else {
            RoutesMapping[req.method](router, req.path);
            next();
        }
    });
    return router;
}
exports.default = default_1;
