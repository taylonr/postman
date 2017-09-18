'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  warn: function warn(func, msg, url) {
    if (!(0, _config2.default)().ignoreWarnings && (typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && console.warn) {
      console.warn('Warning: testdouble.js - ' + func + ' - ' + msg + withUrl(url));
    }
  },
  error: function error(func, msg, url) {
    if (!(0, _config2.default)().suppressErrors) {
      throw new Error('Error: testdouble.js - ' + func + ' - ' + msg + withUrl(url));
    }
  },
  fail: function fail(msg) {
    throw new Error(msg);
  }
};


var withUrl = function withUrl(url) {
  return url != null ? ' (see: ' + url + ' )' : '';
};