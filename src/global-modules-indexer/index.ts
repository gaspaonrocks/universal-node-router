import fs = require('fs');
import path = require('path');
import Utils from '../utils/utils';

let utils = Utils;
let modulesIndex: object = {};

let startRecursiveCheck = (filePath: string): void => {
    fs.readdir(filePath, (err, content) => {
        if (err) throw new Error(err.message);
        else content.forEach(e => {
            let name = e.replace(/.(j|t)s/, '');
            modulesIndex[name] = {};

            fs.stat(filePath + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = utils.requireMyTsFile(e, filePath) : nextChecks(name, filePath + '/' + e);
            });
        });
    })
}

let nextChecks = (name: string, filePath: string): void => {
    fs.readdir(filePath, (err, content) => {
        if (err) throw new Error(err.message);
        else content.forEach(e => {
            fs.stat(filePath + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = utils.requireMyTsFile(e, filePath) : nextChecks(name, filePath + '/' + e);
            });
        });
    })
}

let readDirQueue = [],
    fileList = [];

function getItemList(readDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(readDir, (err, itemList) => {
            if (err) return reject();

            itemList.forEach(e => {
                let name = e.replace(/.(j|t)s/, '');
                modulesIndex[name] = {};
            })

            // resolve with parent path added to each item
            resolve(itemList.map((item) => path.resolve(readDir, item)));
        });
    });
}

function getStat(itemPath) {
    return new Promise((resolve, reject) => {
        fs.stat(itemPath, (err, stat) => {
            if (err) return reject();
            // resolve with item path and if directory
            resolve({itemPath, isDirectory: stat.isDirectory()});
        });
    });
}

function getItemListStat(itemList) {
    // stat all items in list
    return Promise.all(itemList.map(getStat));
}

function processItemList(itemList) {
    //console.log(itemList)
    for (let {itemPath, isDirectory} of itemList) {
        // if directory add to queue
        if (isDirectory) {
            readDirQueue.push(itemPath);
            continue;
        }
        // add file to list
        fileList.push(itemPath);
    }
    // if queue, process next item recursive
    if (readDirQueue.length > 0) {
        return readDir(readDirQueue.shift());
    }
    // finished - return file list
    return fileList;
}

function readDir(dir) {
    // read item list from directory, stat each item then walk result
    return getItemList(dir)
        .then(getItemListStat)
        .then(processItemList);
}

function readDirRecursive(startDir) {
    // commence reading at the top
    return readDir(startDir);
}

let GlobalModulesIndexer = (context: string, dirName: string): object => {
    let absolutePath = path.join(context, dirName);

    startRecursiveCheck(absolutePath);

    readDirRecursive(absolutePath).then(itemList => {
        itemList.forEach(e => {
            e.split('/')
        }
    });

    return modulesIndex;
}

export default GlobalModulesIndexer;