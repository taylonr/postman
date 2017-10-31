'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _create = require('../create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: 'contains',
  matches: function matches(containings, actualArg) {
    if (containings.length === 0) return false;

    return _lodashWrap2.default.every(containings, function (containing) {
      if (_lodashWrap2.default.isArray(containing)) {
        return _lodashWrap2.default.some(actualArg, function (actualElement) {
          return _lodashWrap2.default.isEqual(actualElement, containing);
        });
      } else if (_lodashWrap2.default.isRegExp(containing)) {
        return containing.test(actualArg);
      } else if (_lodashWrap2.default.isObjectLike(containing) && _lodashWrap2.default.isObjectLike(actualArg)) {
        return containsAllSpecified(containing, actualArg);
      } else {
        return _lodashWrap2.default.includes(actualArg, containing);
      }
    });
  }
});


var containsAllSpecified = function containsAllSpecified(containing, actual) {
  return actual != null && _lodashWrap2.default.every(containing, function (val, key) {
    return _lodashWrap2.default.isObjectLike(val) ? containsAllSpecified(val, actual[key]) : _lodashWrap2.default.isEqual(val, actual[key]);
  });
};