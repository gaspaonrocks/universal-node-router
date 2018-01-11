"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(config) {
        this.methodNames = {
            getAll: "list",
            getOne: "find",
            post: "create",
            update: "update",
            delete: "delete"
        };
        this.setMethods(config);
    }
    getMethod(key) {
        return this.methodNames[key];
    }
    setMethods(config) {
        for (let key in this.methodNames) {
            if (config[key] != null)
                this.methodNames[key] = config[key];
        }
    }
}
exports.default = Config;
