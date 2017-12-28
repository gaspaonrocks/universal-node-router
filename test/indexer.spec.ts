'use strict';

var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('assert');
var mock = require('mock-fs');

var indexer = require('../src/global-modules-indexer/index');



describe('ModulesIndexer', function () {
  xit('should be a function', function () {
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
});