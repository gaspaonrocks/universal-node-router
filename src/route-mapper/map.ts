import { Router } from 'express';
import GlobalModulesIndexer from '../global-modules-indexer/index';
import Utils from '../utils/utils';

export default function (context: string, dirName: string): Router {
    let router: Router = Router();
    let modulesIndex = GlobalModulesIndexer(context, dirName)

    let utils = Utils;

    const RoutesMapping = {
        'GET': (router: Router, path: string): void => {
            let options = utils.options(path);
            let ctrl = options.ctrl;

            if (modulesIndex[ctrl] != null) {
                utils.hasReqParams(path) ?
                    router.get(options.url, (req, res, next) => { return modulesIndex[ctrl].find(req, res, next); }) :
                    router.get(path, (req, res, next) => { return modulesIndex[ctrl].list(req, res, next); });
            }
        },
        'POST': (router: Router, path: string): void => {
            let ctrl = path.replace('/', '');

            if (modulesIndex[ctrl] != null) {
                router.post(path, (req, res, next) => {
                    return modulesIndex[ctrl].create(req, res, next);
                })
            }
        },
        'PUT': (router: Router, path: string): void => {
            let options = utils.options(path);
            let ctrl = options.ctrl;

            if (modulesIndex[ctrl] != null) {
                router.put(options.url, (req, res, next) => {
                    return modulesIndex[ctrl].update(req, res, next);
                })
            }
        },
        'PATCH': (router: Router, path: string): void => {
            let options = utils.options(path);
            let ctrl = options.ctrl;

            if (modulesIndex[ctrl] != null) {
                router.patch(options.url, (req, res, next) => {
                    return modulesIndex[ctrl].update(req, res, next);
                })
            }
        },
        'DELETE': (router: Router, path: string): void => {
            let options = utils.options(path);
            let ctrl = options.ctrl;

            if (modulesIndex[ctrl] != null) {
                router.delete(options.url, (req, res, next) => {
                    return modulesIndex[ctrl].delete(req, res, next);
                })
            }
        }
    }

    router.all('*', (req, res, next) => {
        if (typeof RoutesMapping[req.method] !== 'function') {
            res.status(500).json(`Request not handled, it must be one of GET, POST, PUT, PATCH or DELETE.`)
        } else {
            RoutesMapping[req.method](router, req.path);
            next();
        }
    });

    return router;
};