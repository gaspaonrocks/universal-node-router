"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./route-mapper/map");
var global_modules_indexer_1 = require("./global-modules-indexer");
var config_1 = require("./utils/config");
module.exports = /** @class */ (function () {
    function Router(context, customConfig) {
        if (customConfig === void 0) { customConfig = {}; }
        this.context = context;
        this.config = new config_1.default(customConfig);
    }
    Router.prototype.mapper = function (dirPath) {
        return map_1.default(this.context, this.config, dirPath);
    };
    Router.prototype.indexer = function (dirPath) {
        return global_modules_indexer_1.default(this.context, dirPath);
    };
    return Router;
}());
