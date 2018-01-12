'use strict';

/**
 * Import test suite
 */
import 'mocha';
import * as express from 'express';
import * as sinon from 'sinon';
import {request} from 'https';

/**
 * Import chai library
 */
const chai = require('chai');
const chaiHttp = require('chai-http');

let customConfig = {
  getAll: 'listAll',
  getOne: 'findOne'
};

import mapper from '../src/route-mapper/map';
let map = mapper(__dirname, customConfig, './mocks');

/**
 * Set up express stub and tested module stub
 */


chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(() => {})

/**
 * Start testing
 */

describe('RouteMapper', () => {
  it('should be a function', () => {
    console.log(map.stack[0].route)
    expect(typeof map).to.equal('function');
    
  });

  it('should return a router object', () => {
    expect(typeof map).to.equal('function');
  });

  xdescribe('handling errors during mapping', () => {
    it('should return an error 500 if request is not handled', () => {

    });
  })
  xdescribe('skippin this part for now', () => {
    it('should return 404 if url is not matching anything', () => {

    });
  })

  xdescribe('mapping to controller with methods correctly named', () => {
    it('should return a collection', () => {

    });

    it('should return a single document', () => {

    });

    it('should post a single document', () => {

    });

    it('should update a single document', () => {

    });

    it('should update a single document', () => {

    });

    it('should delete a single document', () => {

    });
  });

  xdescribe('mapping to controller with methods incorrectly named', () => {
    it('should return an error when fetching a collection', () => {

    });

    it('should return an error when fetching a single document', () => {

    });

    it('should return an error when posting a single document', () => {

    });

    it('should return an error when updating a single document', () => {

    });

    it('should return an error when updating a single document', () => {

    });

    it('should return an error when deleting a single document', () => {

    });
  });
});