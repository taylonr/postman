'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (thing) {
  return thing && thing.prototype && _lodashWrap2.default.some(Object.getOwnPropertyNames(thing.prototype), function (property) {
    return property !== 'constructor' && _lodashWrap2.default.isFunction(thing.prototype[property]);
  });
};