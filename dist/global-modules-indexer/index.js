"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils_1 = require("../utils/utils");
let utils = utils_1.default;
let fileQueue = [];
let dirQueue = [];
let getPathList = (inputDir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(inputDir, (err, content) => {
            if (err)
                reject(err);
            resolve(content.map((item) => path.resolve(inputDir, item)));
        });
    });
};
let getStat = (path) => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, result) => {
            if (err)
                reject(err);
            resolve(result.isFile() ? fileQueue.push(path) : dirQueue.push(path));
        });
    });
};
let getAllStat = (pathList) => {
    return Promise.all(pathList.map(path => getStat(path)));
};
let processItemList = () => {
    // if queue, process next item recursive
    while (dirQueue.length > 0)
        return readDir(dirQueue.shift());
    return fileQueue;
};
let StartIt = (inputDir) => {
    return readDir(inputDir);
};
let readDir = (inputDir) => {
    return getPathList(inputDir)
        .then(getAllStat)
        .then(processItemList);
};
let setUpModules = (fileList) => {
    let modulesIndex2 = {};
    fileList.forEach(e => {
        let name = e.split('\\').pop().replace(/.(j|t)s/, '');
        modulesIndex2[name] = utils.requireMyTsFile(e);
    });
    return modulesIndex2;
};
let GlobalModulesIndexer = (context, dirName) => {
    let absolutePath = path.join(context, dirName);
    //startRecursiveCheck(absolutePath);
    return StartIt(absolutePath).then(setUpModules);
};
exports.default = GlobalModulesIndexer;
