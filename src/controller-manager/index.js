'use strict';

let fs = require('fs');

module.exports = function ctrlListing(dirName) {
  let indexCtrl = {};

  fs.readdirSync(dirName)
    .forEach(e => {
      let name = e.replace('.js', '');
      let ctrl = require('../../.' + dirName + '/' + e);

      indexCtrl[name] = ctrl;
    })

  return indexCtrl;
};