[![Build Status](https://travis-ci.org/gaspaonrocks/universal-node-router.svg?branch=master)](https://travis-ci.org/gaspaonrocks/universal-node-router) [![NPM](https://nodei.co/npm/universal-node-router.png?downloads=true&stars=true)](https://www.npmjs.com/package/universal-node-router) [![Coverage Status](https://coveralls.io/repos/github/gaspaonrocks/universal-node-router/badge.svg?branch=master)](https://coveralls.io/github/gaspaonrocks/universal-node-router?branch=master) [![GitHub version](https://badge.fury.io/gh/gaspaonrocks%2Funiversal-node-router.svg)](https://badge.fury.io/gh/gaspaonrocks%2Funiversal-node-router)
===========

## SET UP

first install it with 
```bash
npm install -S universal-node-router
```

then when configuring your server with node and express:

```javascript
// import and assign the route mapper
let router = require('universal-node-router');
// tell Express to use it as target for your endpoints
app.use('/api', router.mapper('path/to/controllers/directory'));
```

It should be used to make it easier to go from writing your client 
to configuring your server. The url should match the name of your controller.

For example, /api/books will call the controller books.js.

Another case, /api/books/you/are/badass will call the controller books.js with : 
```javascript
req.params = {
  param1: 'you',
  param2: 'are',
  param3: 'badass'
}
```

Beware that controllers should be exported as modules, classes, functions, anything that is accessible.

The methods should have clear names :

typeOfRequest | nameOfMethod
--- | ---
GET(Collection) | list
GET(One) | find
POST | create
PUT | update 
PATCH | (same method as above)
DELETE | delete

The choice of DataBase should not impact the router, since the logic is written
in the controllers, AS LONG AS THE METHOD HAVE THE SAME NAME.

IN DEVELOPMENT : 
 - [X] A better management of the context for the require
 - [ ] A config file to use custom method names
 - [ ] More tests to cover 100% of the code
 - [X] A better handling of request (GetCollection vs GetOne)
 - [ ] A webpack plugin for modern projects (dynamic require doesn't work yet...)
 - [ ] Improve ctrlIndexer to GlobalModulesIndexer
