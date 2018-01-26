export default class ErrorHandler {
    result: string;
    constructor();
    errorChecker(method: Function, useCase: string): boolean;
    isNullOrUndefined(router: any, method: string): any;
}
