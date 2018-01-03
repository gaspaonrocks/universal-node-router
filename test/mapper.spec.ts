'use strict';

import {expect} from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as express from 'express';
import * as sinon from 'sinon';

let bodyParser = require('body-parser');

const Router = require('../src');
const router = new Router(__dirname);
const app = express();

// Tell Express that messages bodies will be JSON formatted
app.use(bodyParser.json());
// Only parses urlencoded bodies (gzip and deflate enabled)
app.use(bodyParser.urlencoded({
  extended: false
}));
const map = router.mapper('./mocks');

describe('RouteMapper', () => {
  it('should be a function', () => {
    expect(typeof router.mapper).to.equal('function');
  });

  it('should return a router object', () => {
    let useCase = router.mapper('./mocks');
    expect(typeof useCase).to.equal('function');
  });

  describe('get a collection', () => {
    let request;

    beforeEach(() => {
      app.use('/', map);

      request = supertest(app);
    });

    it('should return an error 500 if request is not handled', (done) => {
      request
        .link('/test')
        .expect('Content-type', /json/)
        .expect(500, (err, res) => {
          expect(res.status).to.deep.equal(500);
          expect(res.body).to.deep.equal('Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE');
          done();
        });
    });

    it('should return 404 if url is not matching anything', (done) => {
      request
        .get('/test/hello/world')
        .expect('Content-type', "text/html; charset=utf-8")
        .expect(404, () => {
          done();
        });
    });

    it('should return a collection', (done) => {
      request
        .get('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          done();
        });
    });
  })
});