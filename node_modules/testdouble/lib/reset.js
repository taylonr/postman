'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _quibble = require('quibble');

var _quibble2 = _interopRequireDefault(_quibble);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetHandlers = [];

exports.default = _lodashWrap2.default.tap(function () {
  _store2.default.reset();
  _quibble2.default.reset();
  _lodashWrap2.default.each(resetHandlers, function (resetHandler) {
    return resetHandler();
  });
  resetHandlers = [];
}, function (reset) {
  reset.onNextReset = function (func) {
    return resetHandlers.push(func);
  };
});