"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = require("./route-mapper/map");
const global_modules_indexer_1 = require("./global-modules-indexer");
const config_1 = require("./utils/config");
module.exports = class Router {
    constructor(context, customConfig = {}) {
        this.context = context;
        this.config = new config_1.default(customConfig);
    }
    mapper(dirPath) {
        return map_1.default(this.context, this.config, dirPath);
    }
    indexer(dirPath) {
        return global_modules_indexer_1.default(this.context, dirPath);
    }
};
