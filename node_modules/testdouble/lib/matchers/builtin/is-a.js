'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _create = require('../create');

var _create2 = _interopRequireDefault(_create);

var _arguments = require('../../stringify/arguments');

var _arguments2 = _interopRequireDefault(_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: function name(matcherArgs) {
    var desc = _lodashWrap2.default.get(matcherArgs[0], 'name') || (0, _arguments2.default)(matcherArgs);
    return 'isA(' + desc + ')';
  },
  matches: function matches(matcherArgs, actual) {
    var type = matcherArgs[0];

    if (type === Number) {
      return _lodashWrap2.default.isNumber(actual);
    } else if (type === String) {
      return _lodashWrap2.default.isString(actual);
    } else if (type === Boolean) {
      return _lodashWrap2.default.isBoolean(actual);
    } else {
      return actual instanceof type;
    }
  }
});