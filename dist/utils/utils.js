"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    hasReqParams: (path) => {
        return path.split('/').filter(e => e.length > 0).length > 1;
    },
    reqParamsOptions: (path) => path
        .split('/')
        .filter(e => e.length > 0)
        .reduce((accumulator, currentValue, i) => i === 0 ? Object.assign({}, accumulator, { ctrl: currentValue, url: accumulator.url + `/${currentValue}` }) : Object.assign({}, accumulator, { [`param${i}`]: currentValue, url: accumulator.url + `/:param${i}` }), { ctrl: '', url: '' }),
    requireMyTsFile: (fileName, filePath) => {
        return fileName.match(/.ts$/) ? require(filePath + '/' + fileName).default : require(filePath + '/' + fileName);
    }
};
