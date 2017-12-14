import { Router } from 'express';
import GlobalModulesIndexer from '../global-modules-indexer/index';
import Utils from '../utils/utils';

export default function (context: string, dirName: string): Router {
    let router: Router = Router();
    let modulesIndex = GlobalModulesIndexer(context, dirName)

    let utils = Utils;

    const RoutesMapping = {
        'GET': function (router: Router, path: string) {
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
};