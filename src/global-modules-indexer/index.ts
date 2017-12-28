import fs = require('fs');
import path = require('path');

let modulesIndex: object = {};

let startRecursiveCheck = (path: string): void => {
    fs.readdirSync(path).forEach(e => {
        let name = e.replace('.js', '');
        modulesIndex[name] = {};

        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
}

let nextChecks = (name: string, path: string): void => {
    fs.readdirSync(path).forEach(e => {
        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
}


let GlobalModulesIndexer = (context: string, dirName: string): object => {
    let absolutePath = path.join(context, dirName);

    startRecursiveCheck(absolutePath);

    return modulesIndex;
}

export default GlobalModulesIndexer;