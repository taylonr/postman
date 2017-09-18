'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _argsMatch = require('../args-match');

var _argsMatch2 = _interopRequireDefault(_argsMatch);

var _callback = require('../callback');

var _callback2 = _interopRequireDefault(_callback);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  add: function add(testDouble, args, stubbedValues, config) {
    return _index2.default.for(testDouble).stubbings.push({
      callCount: 0,
      stubbedValues: stubbedValues,
      args: args,
      config: config
    });
  },
  invoke: function invoke(testDouble, actualArgs, actualContext) {
    var stubbing = stubbingFor(testDouble, actualArgs);
    if (stubbing) {
      return executePlan(stubbing, actualArgs, actualContext);
    }
  },
  for: function _for(testDouble) {
    return _index2.default.for(testDouble).stubbings;
  }
};


var stubbingFor = function stubbingFor(testDouble, actualArgs) {
  return _lodashWrap2.default.findLast(_index2.default.for(testDouble).stubbings, function (stubbing) {
    return isSatisfied(stubbing, actualArgs);
  });
};

var executePlan = function executePlan(stubbing, actualArgs, actualContext) {
  var value = stubbedValueFor(stubbing);
  stubbing.callCount += 1;
  invokeCallbackFor(stubbing, actualArgs);
  switch (stubbing.config.plan) {
    case 'thenReturn':
      return value;
    case 'thenDo':
      return value.apply(actualContext, actualArgs);
    case 'thenThrow':
      throw value;
    case 'thenResolve':
      return createPromise(stubbing, value, true);
    case 'thenReject':
      return createPromise(stubbing, value, false);
  }
};

var invokeCallbackFor = function invokeCallbackFor(stubbing, actualArgs) {
  if (_lodashWrap2.default.some(stubbing.args, _callback2.default.isCallback)) {
    _lodashWrap2.default.each(stubbing.args, function (expectedArg, i) {
      if (_callback2.default.isCallback(expectedArg)) {
        callCallback(stubbing, actualArgs[i], callbackArgs(stubbing, expectedArg));
      }
    });
  }
};

var callbackArgs = function callbackArgs(stubbing, expectedArg) {
  if (expectedArg.args != null) {
    return expectedArg.args;
  } else if (stubbing.config.plan === 'thenCallback') {
    return stubbing.stubbedValues;
  } else {
    return [];
  }
};

var callCallback = function callCallback(stubbing, callback, args) {
  if (stubbing.config.delay) {
    return _lodashWrap2.default.delay.apply(_lodashWrap2.default, [callback, stubbing.config.delay].concat(_toConsumableArray(args)));
  } else if (stubbing.config.defer) {
    return _lodashWrap2.default.defer.apply(_lodashWrap2.default, [callback].concat(_toConsumableArray(args)));
  } else {
    return callback.apply(undefined, _toConsumableArray(args)); // eslint-disable-line
  }
};

var createPromise = function createPromise(stubbing, value, willResolve) {
  var Promise = (0, _config2.default)().promiseConstructor;
  ensurePromise(Promise);
  return new Promise(function (resolve, reject) {
    callCallback(stubbing, function () {
      return willResolve ? resolve(value) : reject(value);
    }, [value]);
  });
};

var stubbedValueFor = function stubbedValueFor(stubbing) {
  return stubbing.callCount < stubbing.stubbedValues.length ? stubbing.stubbedValues[stubbing.callCount] : _lodashWrap2.default.last(stubbing.stubbedValues);
};

var isSatisfied = function isSatisfied(stubbing, actualArgs) {
  return (0, _argsMatch2.default)(stubbing.args, actualArgs, stubbing.config) && hasTimesRemaining(stubbing);
};

var hasTimesRemaining = function hasTimesRemaining(stubbing) {
  return stubbing.config.times == null ? true : stubbing.callCount < stubbing.config.times;
};

var ensurePromise = function ensurePromise(Promise) {
  if (Promise == null) {
    return _log2.default.error('td.when', 'no promise constructor is set (perhaps this runtime lacks a native Promise\nfunction?), which means this stubbing can\'t return a promise to your\nsubject under test, resulting in this error. To resolve the issue, set\na promise constructor with `td.config`, like this:\n\n  td.config({\n    promiseConstructor: require(\'bluebird\')\n  })');
  }
};