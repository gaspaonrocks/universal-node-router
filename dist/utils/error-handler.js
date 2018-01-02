'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
        this.result = '';
    }
    ErrorHandler.prototype.errorChecker = function (method, useCase) {
        if (typeof method !== 'function') {
            switch (useCase) {
                case 'mapper':
                    this.result = 'Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE';
                    return true;
                case 'controller':
                    this.result = "Trying to use a method not implemented in the controller like advised in the docs of the router.\nGo have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.\nIf it is still not working, post an issue.";
                    return true;
                default:
                    this.result = 'Use case not covered';
                    return false;
            }
        }
        else if (typeof method === 'function') {
            this.result = 'No error here...';
            return false;
        }
    };
    return ErrorHandler;
}());
exports.default = ErrorHandler;
