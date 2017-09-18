'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (original, target, name, originalValue, targetValue) {
  if (name !== 'prototype' || !_lodash2.default.isFunction(original)) return targetValue;

  targetValue.__proto__ = originalValue; // eslint-disable-line
  targetValue.constructor = target;
  return targetValue;
};