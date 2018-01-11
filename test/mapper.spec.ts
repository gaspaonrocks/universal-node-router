'use strict';

import {expect} from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as express from 'express';
import * as sinon from 'sinon';

let bodyParser = require('body-parser');

const Router = require('../src');
let customConfig = {
  getAll: 'listAll',
  getOne: 'findOne'
};
const router = new Router(__dirname, customConfig);
const app = express();

// Tell Express that messages bodies will be JSON formatted
app.use(bodyParser.json());
// Only parses urlencoded bodies (gzip and deflate enabled)
app.use(bodyParser.urlencoded({
  extended: false
}));
const map = router.mapper('./mocks');

describe('RouteMapper', () => {
  let request;

  it('should be a function', () => {
    expect(typeof router.mapper).to.equal('function');
  });

  it('should return a router object', () => {
    let useCase = router.mapper('./mocks');
    expect(typeof useCase).to.equal('function');
  });

  beforeEach(() => {
    app.use('/', map);

    request = supertest(app);
  });

  describe('handling errors during mapping', () => {
    it('should return an error 500 if request is not handled', () => {
      return request
        .link('/test')
        .expect('Content-type', /json/)
        .expect(500)
        .then(res => {
          expect(res.status).to.deep.equal(500);
          expect(res.body).to.deep.equal('Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE');
        })
        .catch(err => console.error(err))
    });

    it('should return 404 if url is not matching anything', () => {
      return request
        .get('/this/is/not/a/known/adress')
        .expect('Content-type', "text/html; charset=utf-8")
        .expect(404)
        .then(res => {
          expect(res.status).to.deep.equal(404);
          expect(res.res.statusMessage).to.deep.equal('Not Found');
        })
        .catch(err => console.error(err))
    });
  })

  describe('mapping to controller with methods correctly named', () => {
    it('should return a collection', () => {
      return request
        .get('/index')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });

    it('should return a single document', () => {
      return request
        .get('/index/param1')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });

    it('should post a single document', () => {
      return request
        .post('/index')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });

    it('should update a single document', () => {
      return request
        .put('/index')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });

    it('should update a single document', () => {
      return request
        .patch('/index')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });

    it('should delete a single document', () => {
      return request
        .delete('/index')
        .set('Content-type', 'application/json')
        .expect(200)
        .then()
        .catch(err => console.error(err))
    });
  });

  describe('mapping to controller with methods incorrectly named', () => {


    it('should return an error when fetching a collection', () => {
      return request
        .get('/beta')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });

    it('should return an error when fetching a single document', () => {
      return request
        .get('/beta/param1')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });

    it('should return an error when posting a single document', () => {
      return request
        .post('/beta')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });

    it('should return an error when updating a single document', () => {
      return request
        .put('/beta')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });

    it('should return an error when updating a single document', () => {
      return request
        .patch('/beta')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });

    it('should return an error when deleting a single document', () => {
      return request
        .delete('/beta')
        .set('Content-type', 'application/json')
        .expect(500)
        .then(res => {
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep.equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
        })
        .catch(err => console.log(err))
    });
  });
});