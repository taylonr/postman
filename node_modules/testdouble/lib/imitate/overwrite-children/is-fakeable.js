'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isGenerator = require('../is-generator');

var _isGenerator2 = _interopRequireDefault(_isGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (thing) {
  return !(!_lodash2.default.isObject(thing) || isBoxedType(thing) || (0, _isGenerator2.default)(thing));
};

var isBoxedType = function isBoxedType(thing) {
  return _lodash2.default.compact([Boolean, Date, Number, RegExp, String, global.Symbol]).some(function (type) {
    return thing instanceof type;
  });
};