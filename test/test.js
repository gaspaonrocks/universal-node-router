'use strict';

var expect = require('chai').expect;
var assert = require('assert');
var mapper = require('../route-mapper/map');

describe('RouteMapper', function () {
  it('should be a function', function () {
    assert.equal(typeof mapper, 'function');
  });
});