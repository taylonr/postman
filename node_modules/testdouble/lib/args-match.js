'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _isMatcher = require('./matchers/is-matcher');

var _isMatcher2 = _interopRequireDefault(_isMatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (expectedArgs, actualArgs) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (arityMismatch(expectedArgs, actualArgs, config)) {
    return false;
  } else if (config.allowMatchers !== false) {
    return equalsWithMatchers(expectedArgs, actualArgs);
  } else {
    return _lodashWrap2.default.isEqual(expectedArgs, actualArgs);
  }
};

var arityMismatch = function arityMismatch(expectedArgs, actualArgs, config) {
  return expectedArgs.length !== actualArgs.length && !config.ignoreExtraArgs;
};

var equalsWithMatchers = function equalsWithMatchers(expectedArgs, actualArgs) {
  return _lodashWrap2.default.every(expectedArgs, function (expectedArg, key) {
    return argumentMatchesExpectation(expectedArg, actualArgs[key]);
  });
};

var argumentMatchesExpectation = function argumentMatchesExpectation(expectedArg, actualArg) {
  if ((0, _isMatcher2.default)(expectedArg)) {
    return matcherTestFor(expectedArg)(actualArg);
  } else {
    return _lodashWrap2.default.isEqualWith(expectedArg, actualArg, function (expectedEl, actualEl) {
      if ((0, _isMatcher2.default)(expectedEl)) {
        return matcherTestFor(expectedEl)(actualEl);
      }
    });
  }
};

var matcherTestFor = function matcherTestFor(matcher) {
  return matcher.__matches;
};