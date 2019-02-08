"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(config = {}) {
        this.methodNames = {
            getAll: "list",
            getOne: "find",
            post: "create",
            update: "update",
            delete: "delete"
        };
        this.getMethod = (key) => this.methodNames[key];
        this.setMethods = (config) => Object
            .keys(this.methodNames)
            .reduce((obj, key) => config[key] != null ? Object.assign({}, obj, { [key]: config[key] }) : Object.assign({}, obj, { [key]: this.methodNames[key] }), {});
        this.methodNames = this.setMethods(config);
    }
}
exports.default = Config;
