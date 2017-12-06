'use strict';

var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('assert');
var mock = require('mock-fs');

var indexer = require('../src/controller-manager/index');



describe('CtrlIndexer', function () {
  it('should be a function', function () {
    assert.equal(typeof indexer, 'function');
  });

  xit('should read files in dir', function () {
    before(function () {
      mock({
        '/mockCtrl': {
          "ctrl1.js": "module.exports = {}",
          "ctrl2.js": "module.exports = {}",
          "ctrl3.js": "module.exports = {}"
        }
      })
    });

    after(function () {
      mock.restore();
    })

    let test = indexer(__dirname + '/mockCtrl');

    test.should.be.a('Object');
  });

  /* it('should be a function', function () {
    assert.equal(typeof indexer, 'function');
  });

  it('should be a function', function () {
    assert.equal(typeof indexer, 'function');
  });

  it('should be a function', function () {
    assert.equal(typeof indexer, 'function');
  }); */
});