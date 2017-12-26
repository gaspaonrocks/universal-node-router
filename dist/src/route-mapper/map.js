"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../global-modules-indexer/index");
var utils_1 = require("../utils/utils");
function default_1(context, dirName) {
    var router = express_1.Router();
    var modulesIndex = index_1.default(context, dirName);
    var utils = utils_1.default;
    var RoutesMapping = {
        'GET': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                utils.hasReqParams(path) ?
                    router.get(options.url, function (req, res, next) { return modulesIndex[ctrl].find(req, res, next); }) :
                    router.get(path, function (req, res, next) { return modulesIndex[ctrl].list(req, res, next); });
            }
        },
        'POST': function (router, path) {
            var ctrl = path.replace('/', '');
            if (modulesIndex[ctrl] != null) {
                router.post(path, function (req, res, next) {
                    return modulesIndex[ctrl].create(req, res, next);
                });
            }
        },
        'PUT': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.put(options.url, function (req, res, next) {
                    return modulesIndex[ctrl].update(req, res, next);
                });
            }
        },
        'PATCH': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.patch(options.url, function (req, res, next) {
                    return modulesIndex[ctrl].update(req, res, next);
                });
            }
        },
        'DELETE': function (router, path) {
            var options = utils.options(path);
            var ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.delete(options.url, function (req, res, next) {
                    return modulesIndex[ctrl].delete(req, res, next);
                });
            }
        }
    };
    router.all('*', function (req, res, next) {
        if (typeof RoutesMapping[req.method] !== 'function') {
            res.status(500).json("Request not handled, it must be one of GET, POST, PUT, PATCH or DELETE.");
        }
        else {
            RoutesMapping[req.method](router, req.path);
            next();
        }
    });
    return router;
}
exports.default = default_1;
;
