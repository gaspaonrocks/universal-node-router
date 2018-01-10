import fs = require('fs');
import path = require('path');
import Utils  from '../utils/utils';

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

let GlobalModulesIndexer = (context: string, dirName: string): object => {
    let absolutePath = path.join(context, dirName);

    startRecursiveCheck(absolutePath);

    return modulesIndex;
}

export default GlobalModulesIndexer;