'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target) {
  if (_lodashWrap2.default.isString(target)) {
    return _module2.default.apply(undefined, arguments);
  } else {
    return _property2.default.apply(undefined, arguments);
  }
};

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _quibble = require('quibble');

var _quibble2 = _interopRequireDefault(_quibble);

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_quibble2.default.ignoreCallsFromThisFile();