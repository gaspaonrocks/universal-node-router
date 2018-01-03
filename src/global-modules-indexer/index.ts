import fs = require('fs');
import path = require('path');

let modulesIndex: object = {};

let startRecursiveCheck = (filePath: string): void => {
    fs.readdir(filePath, (err, content) => {
        if (err) console.error(err);
        else content.forEach(e => {
            let name = e.replace('.js', '');
            modulesIndex[name] = {};

            fs.stat(filePath + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = require(filePath + '/' + e) : nextChecks(name, filePath + '/' + e);
            });
        });
    })
}

let nextChecks = (name: string, filePath: string): void => {
    fs.readdir(filePath, (err, content) => {
        if (err) console.error(err);
        else content.forEach(e => {
            fs.stat(filePath + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = require(filePath + '/' + e) : nextChecks(name, filePath + '/' + e);
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