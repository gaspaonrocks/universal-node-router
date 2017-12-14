"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./src/route-mapper/map");
var global_modules_indexer_1 = require("./src/global-modules-indexer");
var Router = /** @class */ (function () {
    function Router(context) {
        this.context = context;
    }
    Router.prototype.mapper = function (dirPath) {
        return map_1.default(this.context, dirPath);
    };
    Router.prototype.indexer = function (dirPath) {
        return global_modules_indexer_1.default(this.context, dirPath);
    };
    return Router;
}());
exports.Router = Router;
;
