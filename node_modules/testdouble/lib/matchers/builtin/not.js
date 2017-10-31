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
  name: 'not',
  matches: function matches(matcherArgs, actual) {
    var expected = matcherArgs[0];
    return !_lodashWrap2.default.isEqual(expected, actual);
  }
});