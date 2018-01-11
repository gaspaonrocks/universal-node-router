"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../global-modules-indexer/index");
const utils_1 = require("../utils/utils");
const error_handler_1 = require("../utils/error-handler");
function default_1(context, config, dirName) {
    let router = express_1.Router();
    let modulesIndex;
    index_1.default(context, dirName).then(result => {
        modulesIndex = result;
    });
    let utils = utils_1.default;
    let handler = new error_handler_1.default();
    const RoutesMapping = {
        'GET': (router, path) => {
            let options = utils.reqParamsOptions(path);
            let ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                utils.hasReqParams(path) ?
                    router.get(options.url, (req, res, next) => {
                        if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('getOne')], 'controller'))
                            res.status(500).send(handler.result);
                        else
                            return modulesIndex[ctrl][config.getMethod('getOne')](req, res, next);
                    }) :
                    router.get(path, (req, res, next) => {
                        if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('getAll')], 'controller'))
                            res.status(500).send(handler.result);
                        else
                            return modulesIndex[ctrl][config.getMethod('getAll')](req, res, next);
                    });
            }
        },
        'POST': (router, path) => {
            let ctrl = path.replace('/', '');
            if (modulesIndex[ctrl] != null) {
                router.post(path, (req, res, next) => {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('post')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('post')](req, res, next);
                });
            }
        },
        'PUT': (router, path) => {
            let options = utils.reqParamsOptions(path);
            let ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.put(options.url, (req, res, next) => {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('update')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('update')](req, res, next);
                });
            }
        },
        'PATCH': (router, path) => {
            let options = utils.reqParamsOptions(path);
            let ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.patch(options.url, (req, res, next) => {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('update')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('update')](req, res, next);
                });
            }
        },
        'DELETE': (router, path) => {
            let options = utils.reqParamsOptions(path);
            let ctrl = options.ctrl;
            if (modulesIndex[ctrl] != null) {
                router.delete(options.url, (req, res, next) => {
                    if (handler.errorChecker(modulesIndex[ctrl][config.getMethod('delete')], 'controller'))
                        res.status(500).send(handler.result);
                    else
                        return modulesIndex[ctrl][config.getMethod('delete')](req, res, next);
                });
            }
        }
    };
    router.all('*', (req, res, next) => {
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
