"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    hasReqParams: function (path) {
        return path.split('/').filter(function (e) { return e.length > 0; }).length > 1;
    },
    reqParamsOptions: function (path) {
        var config = {
            ctrl: '',
            url: '/'
        };
        var array = path.split('/').filter(function (e) { return e.length > 0; });
        config.ctrl = array[0];
        config.url += array[0];
        for (var i = 1, len = array.length; i < len; i++) {
            config["param" + i] = array[i];
            config.url += "/:param" + i;
        }
        return config;
    },
    requireMyTsFile: function (fileName, filePath) {
        return fileName.match(/.ts$/) ? require(filePath + '/' + fileName).default : require(filePath + '/' + fileName);
    }
};
