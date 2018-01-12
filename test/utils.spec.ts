'use strict';

import {expect} from 'chai';
import 'mocha';

import Utils from '../src/utils/utils';

describe('Utils module', () => {
  it('Utils should be an object', () => {
    expect(typeof Utils, 'object');
  });

  it('Utils.hasReqParams should be a Function', () => {
    expect(typeof Utils.hasReqParams, 'function');
  });

  it('when given string, Utils.hasReqParams should return a boolean', () => {
    let useCase1 = Utils.hasReqParams('thisIsATest'),
      useCase2 = Utils.hasReqParams('this/is/a/test');

    expect(useCase1).to.be.a('boolean');
    expect(useCase1).to.equal(false);

    expect(useCase2).to.be.a('boolean');
    expect(useCase2).to.equal(true);
  });

  it('Utils.options should be a Function', () => {
    expect(typeof Utils.reqParamsOptions, 'function');
  });

  it('Utils.options: url with no params', () => {
    let useCase = Utils.reqParamsOptions('thisisatest');

    expect(useCase).to.be.a('object');
    expect(useCase).to.have.property('ctrl');
    expect(useCase).to.have.property('url');
    expect(useCase).not.to.have.property('param1');
  });

  it('Utils.options: url with any number of params', () => {
    let rdmNum = Math.floor((Math.random() * 5));
    let useString = '/param0';

    for (let i = 1; i <= rdmNum; i++) {
      useString += `/param${i}`;
    };

    let useCase = Utils.reqParamsOptions(useString);

    expect(useCase).to.be.a('object');
    expect(useCase).to.have.property('ctrl').to.equal('param0');
    expect(useCase).to.have.property('url');

    for (let i = 1; i <= rdmNum; i++) {
      expect(useCase).to.have.property(`param${i}`).to.equal(`param${i}`);
    };
  });
});