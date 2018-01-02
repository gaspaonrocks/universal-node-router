'use strict';

import {expect} from 'chai';
import 'mocha';
import mapper from '../src/route-mapper/map';

describe('RouteMapper', () => {
  it('should be a function', () => {
    expect(typeof mapper).to.equal('function');
  });

  it('should return a router object', () => {
    let useCase = mapper(__dirname, './mocks');

    expect(typeof useCase).to.equal('function');
  });

  
});