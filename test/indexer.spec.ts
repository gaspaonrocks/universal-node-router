'use strict';

import {expect} from 'chai';
import 'mocha';
import Indexer from '../src/global-modules-indexer/index';

describe('ModulesIndexer', () => {
  it('Indexer should be a function', () => {
    expect(typeof Indexer, 'function');
  });

  it('Indexer should return a module object', () => {
    let useCase = Indexer(__dirname, './mocks');
    expect(useCase).to.be.a('object');
  });
});