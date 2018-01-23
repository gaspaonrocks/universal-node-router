import fs = require('fs');
import path = require('path');
import Utils from '../utils/utils';

let utils = Utils;
let fileQueue: Array<string> = [];
let dirQueue: Array<string> = [];

let getPathList = (inputDir: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fs.readdir(inputDir, (err, content) => {
            if (err) reject(err);
            resolve(content.map((item) => path.resolve(inputDir, item)));
        })
    })
}

let getStat = (path: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fs.stat(path, (err, result) => {
            if (err) reject(err);
            resolve(result.isFile() ? fileQueue.push(path) : dirQueue.push(path))
        })
    })
}

let getAllStat = (pathList: Array<string>): Promise<any> => {
    return Promise.all(pathList.map(path => getStat(path)));
}

let processItemList = (): Promise<any> | Array<string> => {
    // if queue, process next item recursive
    while (dirQueue.length > 0) return readDir(dirQueue.shift());

    return fileQueue;
}

let StartIt = (inputDir): Promise<any> => {
    return readDir(inputDir);
}

let readDir = (inputDir): Promise<any> => {
    return getPathList(inputDir)
        .then(getAllStat)
        .then(processItemList)
}

let setUpModules = (fileList): object => {
    let modulesIndex2 = {}
    fileList.forEach(e => {
        let name = e.split('\\').pop().replace(/.(j|t)s/, '');
        modulesIndex2[name] = utils.requireMyTsFile(e);
    })
    return modulesIndex2
}

let GlobalModulesIndexer = (context: string, dirName: string): Promise<object> => {
    let absolutePath = path.join(context, dirName);

    return StartIt(absolutePath).then(setUpModules)
}

export default GlobalModulesIndexer;