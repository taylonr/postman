'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _arguments = require('../stringify/arguments');

var _arguments2 = _interopRequireDefault(_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
  return function () {
    for (var _len = arguments.length, matcherArgs = Array(_len), _key = 0; _key < _len; _key++) {
      matcherArgs[_key] = arguments[_key];
    }

    return _lodashWrap2.default.tap({
      __name: nameFor(config, matcherArgs),
      __matches: function __matches(actualArg) {
        return config.matches(matcherArgs, actualArg);
      }
    }, function (matcherInstance) {
      return _lodashWrap2.default.invoke(config, 'onCreate', matcherInstance, matcherArgs);
    });
  };
};

var nameFor = function nameFor(config, matcherArgs) {
  if (_lodashWrap2.default.isFunction(config.name)) {
    return config.name(matcherArgs);
  } else if (config.name != null) {
    return config.name + '(' + (0, _arguments2.default)(matcherArgs) + ')';
  } else {
    return '[Matcher for (' + (0, _arguments2.default)(matcherArgs) + ')]';
  }
};