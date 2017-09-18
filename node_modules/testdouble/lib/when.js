'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _callback = require('./callback');

var _callback2 = _interopRequireDefault(_callback);

var _calls = require('./store/calls');

var _calls2 = _interopRequireDefault(_calls);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _stubbings = require('./store/stubbings');

var _stubbings2 = _interopRequireDefault(_stubbings);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (__userDoesRehearsalInvocationHere__) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    thenReturn: function thenReturn() {
      for (var _len = arguments.length, stubbedValues = Array(_len), _key = 0; _key < _len; _key++) {
        stubbedValues[_key] = arguments[_key];
      }

      return addStubbing(stubbedValues, config, 'thenReturn');
    },
    thenCallback: function thenCallback() {
      for (var _len2 = arguments.length, stubbedValues = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        stubbedValues[_key2] = arguments[_key2];
      }

      return addStubbing(stubbedValues, config, 'thenCallback');
    },
    thenDo: function thenDo() {
      for (var _len3 = arguments.length, stubbedValues = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        stubbedValues[_key3] = arguments[_key3];
      }

      return addStubbing(stubbedValues, config, 'thenDo');
    },
    thenThrow: function thenThrow() {
      for (var _len4 = arguments.length, stubbedValues = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        stubbedValues[_key4] = arguments[_key4];
      }

      return addStubbing(stubbedValues, config, 'thenThrow');
    },
    thenResolve: function thenResolve() {
      warnIfPromiseless();

      for (var _len5 = arguments.length, stubbedValues = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        stubbedValues[_key5] = arguments[_key5];
      }

      return addStubbing(stubbedValues, config, 'thenResolve');
    },
    thenReject: function thenReject() {
      warnIfPromiseless();

      for (var _len6 = arguments.length, stubbedValues = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        stubbedValues[_key6] = arguments[_key6];
      }

      return addStubbing(stubbedValues, config, 'thenReject');
    }
  };
};

var addStubbing = function addStubbing(stubbedValues, config, plan) {
  var last = _calls2.default.pop();
  ensureRehearsalOccurred(last);
  _lodashWrap2.default.assign(config, { plan: plan });
  _stubbings2.default.add(last.testDouble, concatImpliedCallback(last.args, config), stubbedValues, config);
  return last.testDouble;
};

var ensureRehearsalOccurred = function ensureRehearsalOccurred(last) {
  if (!last) {
    return _log2.default.error('td.when', 'No test double invocation call detected for `when()`.\n\n  Usage:\n    when(myTestDouble(\'foo\')).thenReturn(\'bar\')');
  }
};

var concatImpliedCallback = function concatImpliedCallback(args, config) {
  if (config.plan !== 'thenCallback') {
    return args;
  } else if (!_lodashWrap2.default.some(args, _callback2.default.isCallback)) {
    return args.concat(_callback2.default);
  } else {
    return args;
  }
};

var warnIfPromiseless = function warnIfPromiseless() {
  if ((0, _config2.default)().promiseConstructor == null) {
    _log2.default.warn('td.when', 'no promise constructor is set, so this `thenResolve` or `thenReject` stubbing\nwill fail if it\'s satisfied by an invocation on the test double. You can tell\ntestdouble.js which promise constructor to use with `td.config`, like so:\n\n  td.config({\n    promiseConstructor: require(\'bluebird\')\n  })');
  }
};