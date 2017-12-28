'use strict';

import {expect} from 'chai';
import 'mocha';

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
});