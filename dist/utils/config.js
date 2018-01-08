"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(config) {
        this.methodNames = {
            getAll: "list",
            getOne: "find",
            post: "create",
            update: "update",
            delete: "delete"
        };
        this.setMethods(config);
    }
    Config.prototype.getMethod = function (key) {
        return this.methodNames[key];
    };
    Config.prototype.setMethods = function (config) {
        for (var key in this.methodNames) {
            if (config[key] != null)
                this.methodNames[key] = config[key];
        }
    };
    return Config;
}());
exports.default = Config;
