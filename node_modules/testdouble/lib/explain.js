'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _calls = require('./store/calls');

var _calls2 = _interopRequireDefault(_calls);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _arguments = require('./stringify/arguments');

var _arguments2 = _interopRequireDefault(_arguments);

var _stubbings = require('./store/stubbings');

var _stubbings2 = _interopRequireDefault(_stubbings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (testDouble) {
  if (_store2.default.for(testDouble, false) == null) {
    return nullDescription();
  }
  var calls = _calls2.default.for(testDouble);
  var stubs = _stubbings2.default.for(testDouble);

  return {
    name: _store2.default.for(testDouble).name,
    callCount: calls.length,
    calls: calls,
    description: testdoubleDescription(testDouble, stubs, calls) + stubbingDescription(stubs) + callDescription(calls),
    isTestDouble: true
  };
};

var nullDescription = function nullDescription() {
  return {
    name: undefined,
    callCount: 0,
    calls: [],
    description: 'This is not a test double.',
    isTestDouble: false
  };
};

var testdoubleDescription = function testdoubleDescription(testDouble, stubs, calls) {
  return 'This test double ' + stringifyName(testDouble) + 'has ' + stubs.length + ' stubbings and ' + calls.length + ' invocations.';
};

var stubbingDescription = function stubbingDescription(stubs) {
  return stubs.length > 0 ? _lodashWrap2.default.reduce(stubs, function (desc, stub) {
    return desc + ('\n  - when called with `(' + (0, _arguments2.default)(stub.args) + ')`, then ' + planFor(stub) + ' ' + argsFor(stub) + '.');
  }, '\n\nStubbings:') : '';
};

var planFor = function planFor(stub) {
  switch (stub.config.plan) {
    case 'thenCallback':
      return 'callback';
    case 'thenResolve':
      return 'resolve';
    case 'thenReject':
      return 'reject';
    default:
      return 'return';
  }
};

var argsFor = function argsFor(stub) {
  switch (stub.config.plan) {
    case 'thenCallback':
      return '`(' + (0, _arguments2.default)(stub.stubbedValues, ', ') + ')`';
    default:
      return (0, _arguments2.default)(stub.stubbedValues, ', then ', '`');
  }
};

var callDescription = function callDescription(calls) {
  return calls.length > 0 ? _lodashWrap2.default.reduce(calls, function (desc, call) {
    return desc + ('\n  - called with `(' + (0, _arguments2.default)(call.args) + ')`.');
  }, '\n\nInvocations:') : '';
};

var stringifyName = function stringifyName(testDouble) {
  var name = _store2.default.for(testDouble).name;
  return name ? '`' + name + '` ' : '';
};