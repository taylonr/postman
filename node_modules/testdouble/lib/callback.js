'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _create = require('./matchers/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _lodashWrap2.default.tap((0, _create2.default)({
  name: 'callback',
  matches: function matches(matcherArgs, actual) {
    return _lodashWrap2.default.isFunction(actual);
  },
  onCreate: function onCreate(matcherInstance, matcherArgs) {
    matcherInstance.args = matcherArgs;
    matcherInstance.__testdouble_callback = true;
  }
}), function (callback) {
  // Make callback itself quack like a matcher for its non-invoked use case.
  callback.__name = 'callback';
  callback.__matches = _lodashWrap2.default.isFunction;

  callback.isCallback = function (obj) {
    return obj && (obj === callback || obj.__testdouble_callback === true);
  };
});