Universal Node Router [![Build Status](https://travis-ci.org/gaspaonrocks/universal-node-router.svg?branch=master)](https://travis-ci.org/gaspaonrocks/universal-node-router) [![Coverage Status](https://coveralls.io/repos/github/gaspaonrocks/universal-node-router/badge.svg?branch=master)](https://coveralls.io/github/gaspaonrocks/universal-node-router?branch=master)
===========

## SET UP

first install it with npm install -S universal-node-router

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

* A config file to use custom method names
* A better handling of request
* A webpack plugin for modern projects (dynamic require doesn't work yet...)
