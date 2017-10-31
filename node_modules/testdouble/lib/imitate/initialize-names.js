'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (original, names) {
  if (names != null) return names;
  if (_lodash2.default.isFunction(original) && original.name) {
    return [original.name];
  } else {
    return [];
  }
};