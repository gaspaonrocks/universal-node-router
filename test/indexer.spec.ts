'use strict';

import {expect} from 'chai';
import 'mocha';
import Indexer from '../src/global-modules-indexer/index';

xdescribe('ModulesIndexer', () => {
  it('Indexer should be a function', () => {
    expect(typeof Indexer, 'function');
  });

  it('Indexer should return a Promise object', () => {
    let useCase = Indexer(__dirname, './mocks');
    expect(useCase).to.be.a('promise');
  });
});