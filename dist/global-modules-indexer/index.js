"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils_1 = require("../utils/utils");
let utils = utils_1.default;
let modulesIndex = {};
let startRecursiveCheck = (filePath) => {
    fs.readdir(filePath, (err, content) => {
        if (err)
            throw new Error(err.message);
        else
            content.forEach(e => {
                let name = e.replace(/.(j|t)s$/, '');
                modulesIndex[name] = {};
                fs.stat(filePath + '/' + e, (err, result) => {
                    result.isFile() ? modulesIndex[name] = utils.requireMyTsFile(e, filePath) : nextChecks(name, filePath + '/' + e);
                });
            });
    });
};
let nextChecks = (name, filePath) => {
    fs.readdir(filePath, (err, content) => {
        if (err)
            throw new Error(err.message);
        else
            content.forEach(e => {
                fs.stat(filePath + '/' + e, (err, result) => {
                    result.isFile() ? modulesIndex[name] = utils.requireMyTsFile(e, filePath) : nextChecks(name, filePath + '/' + e);
                });
            });
    });
};
let GlobalModulesIndexer = (context, dirName) => {
    let absolutePath = path.join(context, dirName);
    startRecursiveCheck(absolutePath);
    return modulesIndex;
};
exports.default = GlobalModulesIndexer;
