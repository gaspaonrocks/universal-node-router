export default class ErrorHandler {
  public result: string = ''
  constructor() {}

  errorChecker(method: Function, useCase: string): boolean {
    if (typeof method !== 'function') {
      switch (useCase) {
        case 'mapper':
          this.result = 'Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE';
          return true;
        case 'controller':
          this.result = `Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`;
          return true;
        default:
          this.result = 'No error here...';
          return false;
      }
    }
  }
}