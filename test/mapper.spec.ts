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

  describe('handling errors during mapping', () => {
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
          if (err) done(err);
          else done();
        });
    });

    it('should return 404 if url is not matching anything', (done) => {
      request
        .get('/test/hello/world')
        .expect('Content-type', "text/html; charset=utf-8")
        .expect(404, (err, res) => {
          if (err) done(err);
          else done();
        });
    });
  });

  describe('mapping to controller with methods correctly named', () => {
    let request;

    beforeEach(() => {
      app.use('/', map);

      request = supertest(app);
    });

    it('should return a collection', (done) => {
      request
        .get('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it('should return a single document', (done) => {
      request
        .get('/index/param1')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it('should post a single document', (done) => {
      request
        .post('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it('should update a single document', (done) => {
      request
        .put('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it('should update a single document', (done) => {
      request
        .patch('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it('should delete a single document', (done) => {
      request
        .delete('/index')
        .set('Content-type', 'application/json')
        .expect(200, (err, res) => {
          if (err) done(err);
          else done();
        });
    });
  });

  describe('mapping to controller with methods incorrectly named', () => {
    let request;

    beforeEach(() => {
      app.use('/', map);

      request = supertest(app);
    });

    it('should return an error when fetching a collection', (done) => {
      request
        .get('/beta')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });

    it('should return an error when fetching a single document', (done) => {
      request
        .get('/beta/param1')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });

    it('should return an error when posting a single document', (done) => {
      request
        .post('/beta')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });

    it('should return an error when updating a single document', (done) => {
      request
        .put('/beta')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });

    it('should return an error when updating a single document', (done) => {
      request
        .patch('/beta')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });

    it('should return an error when deleting a single document', (done) => {
      request
        .delete('/beta')
        .set('Content-type', 'application/json')
        .expect(500, (err, res) => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          if (err) done(err);
          else done();
        });
    });
  });
});