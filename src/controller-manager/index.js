'use strict';

let fs = require('fs');
let path = require('path');

module.exports = function ctrlListing(context, dirName) {

  let absolutePath = path.join(context, dirName)

  let indexCtrl = {};

  fs.readdirSync(dirName)
    .forEach(e => {
      let name = e.replace('.js', '');
      let ctrl = require(absolutePath + '/' + e);

      indexCtrl[name] = ctrl;
    })

  return indexCtrl;
};