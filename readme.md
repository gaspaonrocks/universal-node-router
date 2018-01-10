[![Build Status](https://travis-ci.org/gaspaonrocks/universal-node-router.svg?branch=master)](https://travis-ci.org/gaspaonrocks/universal-node-router) [![NPM](https://nodei.co/npm/universal-node-router.png?downloads=true&stars=true)](https://www.npmjs.com/package/universal-node-router) [![Coverage Status](https://coveralls.io/repos/github/gaspaonrocks/universal-node-router/badge.svg?branch=master)](https://coveralls.io/github/gaspaonrocks/universal-node-router?branch=master) [![GitHub version](https://badge.fury.io/gh/gaspaonrocks%2Funiversal-node-router.svg)](https://badge.fury.io/gh/gaspaonrocks%2Funiversal-node-router)
===========

## SET UP

first install it with 
```bash
npm install -S universal-node-router
```

then when configuring your server with node and express:

```typescript
// import and assign the Route Object Constructor
let Router = require('universal-node-router');
// create new Object Router with context as parameter
let router = new Router(__dirname);
// tell Express to use it as target for your endpoints
app.use('/api', router.mapper('path/to/controllers/directory'));
```

It should be used to make it easier to go from writing your client to configuring your server. The url should match the name of your controller.

For example, /api/books will call the controller books.js.

Another case, /api/books/you/are/badass will call the controller books.js with : 
```typescript
req.params = {
  param1: 'you',
  param2: 'are',
  param3: 'badass'
}
```

Beware that controllers should be exported as modules, classes, functions, anything that is accessible through module.exports (or export default in TypeScript).

## WRITING THE CONTROLLERS (without custom methods)
The targeted methods have predefined clear names :

typeOfRequest | nameOfMethod
--- | ---
GET(Collection) | list
GET(One) | find
POST | create
PUT | update 
PATCH | (same name as above)
DELETE | delete

## WRITING THE CONTROLLERS (with custom methods)

You can use custom method names such as listAll for a collection or findOne for a single document.
All you have to do is :

```typescript
// declare an object with the following properties
let customConfig = {
  getAll: "list",
  getOne: "find",
  post: "create",
  update: "update",
  delete: "delete"
}
// when creating the Object Router, add a config file as a SECOND parameter
let router = new Router(__dirname, customConfig);
```

You can replace all of the methods, some of them or none. Property values must be strings.

The choice of DataBase should not impact the router, since the logic is written inside the controllers.
If the controller is not written as it should, the request will throw an error explaining what you have to do.

## CONTRIBUTING
If you want to help with anything, unit tests, methods... Submit a pull request and we'll discuss ;-)

You can also post issues if I ever miss something.

## IN DEVELOPMENT : 
 - [X] A config file to use custom method names
 - [X] Need to test the custom config
 - [ ] GlobalModulesIndexer - make sure the correct index.js is imported
 - [ ] A webpack plugin for modern projects to allow dynamic imports