'use strict';

module.exports = {
  hasReqParams: function (path) {
    return path.split('/').filter(e => e.length > 0).length > 1;
  },
  options: function (path) {
    let object = {
      ctrl: '',
      url: '/'
    };
    let array = path.split('/').filter(e => e.length > 0);
    object.ctrl = array[0];
    object.url += array[0];

    for (let i = 1, len = array.length; i < len; i++) {
      object[`param${i}`] = array[i];
      object.url += `/:param${i}`;
    }

    return object;
  }
};