'use strict';

import {expect} from 'chai';
import 'mocha';
import {Router} from 'express';

import ErrorHandler from '../src/utils/error-handler';
let TestEH = new ErrorHandler();

describe('ErrorHandler module', () => {
  it('ErrorHandler should be a class', () => {
    expect(typeof TestEH, 'class');
  });

  it('ErrorHandler.result should be an empty string', () => {
    expect(typeof TestEH.result, 'string');
    expect(TestEH.result).to.equal('');
  });

  it('ErrorHandler.errorChecker should be a Function', () => {
    expect(typeof TestEH.errorChecker, 'function');
  });

  it('ErrorHandler.errorChecker should return a boolean with a value of false when given an unknown method and any string', () => {
    function mockFn() {
      return 'HelloWorldOfTest !';
    };

    let useCase = TestEH.errorChecker(mockFn, 'anyCase');

    expect(useCase).to.equal(false);
    expect(TestEH.result).to.equal('No error here...');
  });

  it('ErrorHandler.errorChecker should return a boolean with a value of false when given an undefined controller method and a string !== "controller" && string !== "mapper"', () => {
    let mockFn = undefined;

    let useCase = TestEH.errorChecker(mockFn, 'anyCase');

    expect(useCase).to.equal(false);
    expect(TestEH.result).to.equal('Use case not covered');
  });

  it('ErrorHandler.errorChecker should return a boolean with a value of true when given an undefined controller method and a string === "mapper"', () => {
    let mockFn = undefined;

    let useCase = TestEH.errorChecker(mockFn, 'mapper');

    expect(useCase).to.equal(true);
    expect(TestEH.result).to.equal('Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE');
  });

  it('ErrorHandler.errorChecker should return a boolean with a value of true when given an undefined controller method and a string === "controller"', () => {
    let mockFn = undefined;

    let useCase = TestEH.errorChecker(mockFn, 'controller');

    expect(useCase).to.equal(true);
    expect(TestEH.result).to.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
  });

  it('ErrorHandler.isNullOrUndefined should return a string telling the ctrl Index is either null or undefined', ()=>{
    let methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    for (let method of methods) {
      let router:Router = Router();
      let useCase = TestEH.isNullOrUndefined(router, method);
      
      expect(TestEH.result).to.equal(`Couldn't ${method} the targeted controller.
It is either null or undefined, or there must be an error in the URL or in the name of the file`);
    }

  });
});