'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _argsMatch = require('./args-match');

var _argsMatch2 = _interopRequireDefault(_argsMatch);

var _calls = require('./store/calls');

var _calls2 = _interopRequireDefault(_calls);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _arguments = require('./stringify/arguments');

var _arguments2 = _interopRequireDefault(_arguments);

var _stubbings = require('./store/stubbings');

var _stubbings2 = _interopRequireDefault(_stubbings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (__userDoesRehearsalInvocationHere__) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var last = _calls2.default.pop();
  ensureRehearsalOccurred(last);
  if (_calls2.default.wasInvoked(last.testDouble, last.args, config)) {
    // Do nothing! We're verified! :-D
    warnIfStubbed(last.testDouble, last.args);
  } else {
    _log2.default.fail(unsatisfiedErrorMessage(last.testDouble, last.args, config));
  }
};

var ensureRehearsalOccurred = function ensureRehearsalOccurred(last) {
  if (!last) {
    _log2.default.error('td.verify', 'No test double invocation detected for `verify()`.\n\n  Usage:\n    verify(myTestDouble(\'foo\'))');
  }
};

var warnIfStubbed = function warnIfStubbed(testDouble, actualArgs) {
  if (_lodashWrap2.default.some(_stubbings2.default.for(testDouble), function (stubbing) {
    return (0, _argsMatch2.default)(stubbing.args, actualArgs, stubbing.config);
  })) {
    _log2.default.warn('td.verify', 'test double' + stringifyName(testDouble) + ' was both stubbed and verified with arguments (' + (0, _arguments2.default)(actualArgs) + '), which is redundant and probably unnecessary.', 'https://github.com/testdouble/testdouble.js/blob/master/docs/B-frequently-asked-questions.md#why-shouldnt-i-call-both-tdwhen-and-tdverify-for-a-single-interaction-with-a-test-double');
  }
};

var unsatisfiedErrorMessage = function unsatisfiedErrorMessage(testDouble, args, config) {
  return baseSummary(testDouble, args, config) + matchedInvocationSummary(testDouble, args, config) + invocationSummary(testDouble, args, config);
};

var stringifyName = function stringifyName(testDouble) {
  var name = _store2.default.for(testDouble).name;
  return name ? ' `' + name + '`' : '';
};

var baseSummary = function baseSummary(testDouble, args, config) {
  return 'Unsatisfied verification on test double' + stringifyName(testDouble) + '.\n\n  Wanted:\n    - called with `(' + (0, _arguments2.default)(args) + ')`' + timesMessage(config) + ignoreMessage(config) + '.';
};

var invocationSummary = function invocationSummary(testDouble, args, config) {
  var calls = _calls2.default.for(testDouble);
  if (calls.length === 0) {
    return '\n\n  But there were no invocations of the test double.';
  } else {
    return _lodashWrap2.default.reduce(calls, function (desc, call) {
      return desc + ('\n    - called with `(' + (0, _arguments2.default)(call.args) + ')`.');
    }, '\n\n  All calls of the test double, in order were:');
  }
};

var matchedInvocationSummary = function matchedInvocationSummary(testDouble, args, config) {
  var calls = _calls2.default.where(testDouble, args, config);
  var expectedCalls = config.times || 0;

  if (calls.length === 0 || calls.length > expectedCalls) {
    return '';
  } else {
    return _lodashWrap2.default.reduce(_lodashWrap2.default.groupBy(calls, 'args'), function (desc, callsMatchingArgs, args) {
      return desc + ('\n    - called ' + pluralize(callsMatchingArgs.length, 'time') + ' with `(' + (0, _arguments2.default)(callsMatchingArgs[0].args) + ')`.');
    }, '\n\n  ' + pluralize(calls.length, 'call') + ' that satisfied this verification:');
  }
};

var pluralize = function pluralize(x, msg) {
  return x + ' ' + msg + (x === 1 ? '' : 's');
};

var timesMessage = function timesMessage(config) {
  return config.times != null ? ' ' + pluralize(config.times, 'time') : '';
};

var ignoreMessage = function ignoreMessage(config) {
  return config.ignoreExtraArgs != null ? ', ignoring any additional arguments' : '';
};