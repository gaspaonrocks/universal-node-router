import fs = require('fs');
import path = require('path');

let modulesIndex: Object = {};

function startRecursiveCheck(path: string): void {
    fs.readdirSync(path).forEach(e => {
        let name = e.replace('.js', '');
        modulesIndex[name] = {};

        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
}

function nextChecks(name: string, path: string): void {
    fs.readdirSync(path).forEach(e => {
        fs.statSync(path + '/' + e).isFile() ? modulesIndex[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
};


function GlobalModulesIndexer(context: string, dirName: string): Object {
    let absolutePath = path.join(context, dirName);

    startRecursiveCheck(absolutePath);

    return modulesIndex;
};

export default GlobalModulesIndexer;