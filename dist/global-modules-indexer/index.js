"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var modulesIndex = {};
var startRecursiveCheck = function (filePath) {
    fs.readdir(filePath, function (err, content) {
        if (err)
            console.error(err);
        else
            content.forEach(function (e) {
                var name = e.replace('.js', '');
                modulesIndex[name] = {};
                fs.stat(filePath + '/' + e, function (err, result) {
                    result.isFile() ? modulesIndex[name] = require(filePath + '/' + e) : nextChecks(name, filePath + '/' + e);
                });
            });
    });
};
var nextChecks = function (name, filePath) {
    fs.readdir(filePath, function (err, content) {
        if (err)
            console.error(err);
        else
            content.forEach(function (e) {
                fs.stat(filePath + '/' + e, function (err, result) {
                    result.isFile() ? modulesIndex[name] = require(filePath + '/' + e) : nextChecks(name, filePath + '/' + e);
                });
            });
    });
};
var GlobalModulesIndexer = function (context, dirName) {
    var absolutePath = path.join(context, dirName);
    startRecursiveCheck(absolutePath);
    return modulesIndex;
};
exports.default = GlobalModulesIndexer;
