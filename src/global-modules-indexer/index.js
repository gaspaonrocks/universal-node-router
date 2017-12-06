'use strict';

let fs = require('fs');
let path = require('path');

let indexCtrl = {};

function startRecursiveCheck(path) {
    fs.readdirSync(path).forEach(e => {
      let name = e.replace('.js', '');
      indexCtrl[name] = {};

      fs.statSync(path +'/'+ e).isFile() ?  indexCtrl[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
  };
  function nextChecks(name, path) {
    fs.readdirSync(path).forEach(e => {
      fs.statSync(path +'/'+ e).isFile() ?  indexCtrl[name] = require(path + '/' + e) : nextChecks(name, path + '/' + e);
    });
  };

function GlobalModulesIndexer(context, dirName) {
  let absolutePath = path.join(context, dirName);

  startRecursiveCheck(absolutePath);

  return indexCtrl;
};

module.exports = GlobalModulesIndexer;