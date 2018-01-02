import fs = require('fs');
import path = require('path');

let modulesIndex: object = {};

let startRecursiveCheck = (path: string): void => {
    fs.readdir(path, (err, content) => {
        content.forEach(e => {
            let name = e.replace('.js', '');
            modulesIndex[name] = {};

            fs.stat(path + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
            })
        });
    })
}

let nextChecks = (name: string, path: string): void => {
    fs.readdir(path, (err, content) => {
        content.forEach(e => {
            fs.stat(path + '/' + e, (err, result) => {
                result.isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
            })
        });
    })
}


let GlobalModulesIndexer = (context: string, dirName: string): object => {
    let absolutePath = path.join(context, dirName);

    startRecursiveCheck(absolutePath);

    return modulesIndex;
}

export default GlobalModulesIndexer;