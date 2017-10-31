'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _argsMatch = require('../args-match');

var _argsMatch2 = _interopRequireDefault(_argsMatch);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callHistory = []; // <-- remember this to pop our DSL of when(<call>)/verify(<call>)
_index2.default.onReset(function () {
  callHistory = [];
});

exports.default = {
  log: function log(testDouble, args, context) {
    _index2.default.for(testDouble).calls.push({ args: args, context: context });
    return callHistory.push({ testDouble: testDouble, args: args, context: context });
  },
  pop: function pop() {
    return _lodashWrap2.default.tap(callHistory.pop(), function (call) {
      if (call != null) {
        _index2.default.for(call.testDouble).calls.pop();
      }
    });
  },
  wasInvoked: function wasInvoked(testDouble, args, config) {
    var matchingInvocationCount = this.where(testDouble, args, config).length;
    if (config.times != null) {
      return matchingInvocationCount === config.times;
    } else {
      return matchingInvocationCount > 0;
    }
  },
  where: function where(testDouble, args, config) {
    return _lodashWrap2.default.filter(_index2.default.for(testDouble).calls, function (call) {
      return (0, _argsMatch2.default)(args, call.args, config);
    });
  },
  for: function _for(testDouble) {
    return _index2.default.for(testDouble).calls;
  }
};