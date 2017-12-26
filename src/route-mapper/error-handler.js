'use strict';

let ErrorHandler = {
    result: '',
    errorChecker: (method, useCase) => {
        if (typeof method !== 'function') {
            switch (useCase) {
                case 'mapper':
                    ErrorHandler.result = 'Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE';
                    return true;
                    break;
                case 'controller':
                    ErrorHandler.result = `Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`;
                    return true;
                    break;
                default:
                    ErrorHandler.result = 'No error here...';
                    return false;
            };
        };
    }
};

module.exports = ErrorHandler;