"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var modulesIndex = {};
var startRecursiveCheck = function (path) {
    fs.readdirSync(path).forEach(function (e) {
        var name = e.replace('.js', '');
        modulesIndex[name] = {};
        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
};
var nextChecks = function (name, path) {
    fs.readdirSync(path).forEach(function (e) {
        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
};
var GlobalModulesIndexer = function (context, dirName) {
    var absolutePath = path.join(context, dirName);
    startRecursiveCheck(absolutePath);
    return modulesIndex;
};
exports.default = GlobalModulesIndexer;
