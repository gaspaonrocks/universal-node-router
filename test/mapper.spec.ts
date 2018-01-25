"use strict";

/**
 * Import test suite
 */
import "mocha";
import { expect } from "chai";
import * as supertest from "supertest";
import { createSecureContext } from "tls";

let Router = require("../src");
// create custom config
let customConfig = {
  getAll: "listAll",
  getOne: "findOne"
};

// Instantiate new Router object with the context as parameter
let routerCustom = new Router(__dirname, customConfig);
let router = new Router(__dirname);

const createStubServer = require("./stub/stubServer");

let server = createStubServer(routerCustom.mapper("./mocks"));
let request = supertest(server);

/**
 * Start testing
 */
describe("RouteMapper with custom config", () => {
  it("should be a function setting up routing", () => {
    expect(typeof Router).to.equal("function");
  });

  //#region errors
  describe("handling errors during mapping", () => {
    it("should return an error 500 if request is not handled", done => {
      request
        .options("/test/request/not/handled")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.body).to.deep.equal(
            "Request not handled, it must be one of GET, POST, PUT, PATCH, or DELETE"
          );
          done();
        });
    });

    it("should return 404 if url is not matching anything", done => {
      request
        .get("/this/is/not/valid")
        .expect(404)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(404);
          expect(res.res.statusMessage).to.deep.equal("Not Found");
          done();
        });
    });
  });
  //#endregion

  //#region 200
  describe("mapping to controller with methods correctly named", () => {
    it("should return a collection", done => {
      request
        .get("/test/index")
        .expect(200, (err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
      });
    });

    it("should return a single document", done => {
      request
        .get("/test/index/param1")
        .expect(200, (err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
      });
    });

    it("should post a single document", done => {
      request
        .post("/test/index")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
        });
    });

    it("should update a single document", done => {
      request
        .put("/test/index")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
        });
    });

    it("should update part of a single document", done => {
      request
        .patch("/test/index")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
        });
    });

    it("should delete a single document", done => {
      request
        .delete("/test/index")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
        });
    });
  });
  //#endregion

  //#region 500
  describe("mapping to controller with methods incorrectly named", () => {
    it("should return an error when fetching a collection", done => {
      request
        .get("/test/beta")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("should return an error when fetching a single document", done => {
      request
        .get("/test/beta/param1")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("should return an error when posting a single document", done => {
      request
        .post("/test/beta")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("should return an error when updating a single document", done => {
      request
        .put("/test/beta/param1")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("should return an error when updating part of a single document", done => {
      request
        .patch("/test/beta/param1")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("should return an error when deleting a single document", done => {
      request
        .delete("/test/beta/param1")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });
  });
  //#endregion
});
server.close();

server = createStubServer(router.mapper("./mocks"));
request = supertest(server);

describe("RouteMapper with base config", () => {
  //#region non-custom
  describe("should still return", () => {
    it("a collection", done => {
      request
        .get("/test/index")
        .expect(200, (err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
      });
    });

    it("an error when fetching a collection", done => {
      request
        .get("/test/beta")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });

    it("a single document", done => {
      request
        .get("/test/index/param1")
        .expect(200, (err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(200);
          done();
      });
    });

    it("an error when fetching a single document", done => {
      request
        .get("/test/beta/param1")
        .expect(500)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect(res.status).to.deep.equal(500);
          expect(res.error.status).to.deep.equal(500);
          expect(res.error.text).to.deep
            .equal(`Trying to use a method not implemented in the controller like advised in the docs of the router.
Go have a look at https://github.com/gaspaonrocks/universal-node-router/blob/master/readme.md for more info.
If it is still not working, post an issue.`);
          done();
        });
    });
  });
  //#endregion
});
server.close();
