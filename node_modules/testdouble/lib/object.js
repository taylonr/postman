'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _imitate = require('./imitate');

var _imitate2 = _interopRequireDefault(_imitate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = { excludeMethods: ['then'] };

exports.default = function (nameOrType, config) {
  return _lodashWrap2.default.tap(fakeObject(nameOrType, config), function (obj) {
    addToStringToDouble(obj, nameOrType);
  });
};

var fakeObject = function fakeObject(nameOrType, config) {
  if (_lodashWrap2.default.isArray(nameOrType)) {
    return createTestDoublesForFunctionNames(nameOrType);
  } else if (_lodashWrap2.default.isObjectLike(nameOrType)) {
    return (0, _imitate2.default)(nameOrType);
  } else if (_lodashWrap2.default.isString(nameOrType) || nameOrType === undefined) {
    return createTestDoubleViaProxy(nameOrType, withDefaults(config));
  } else if (_lodashWrap2.default.isFunction(nameOrType)) {
    ensureFunctionIsNotPassed();
  } else {
    ensureOtherGarbageIsNotPassed();
  }
};

var createTestDoublesForFunctionNames = function createTestDoublesForFunctionNames(names) {
  return _lodashWrap2.default.transform(names, function (acc, funcName) {
    acc[funcName] = (0, _function2.default)('.' + funcName);
  });
};

var createTestDoubleViaProxy = function createTestDoubleViaProxy(name, config) {
  ensureProxySupport(name);
  var obj = {};
  return new Proxy(obj, {
    get: function get(target, propKey, receiver) {
      if (!obj.hasOwnProperty(propKey) && !_lodashWrap2.default.includes(config.excludeMethods, propKey)) {
        obj[propKey] = (0, _function2.default)(nameOf(name) + '.' + propKey);
      }
      return obj[propKey];
    }
  });
};

var ensureProxySupport = function ensureProxySupport(name) {
  if (typeof Proxy === 'undefined') {
    _log2.default.error('td.object', 'The current runtime does not have Proxy support, which is what\ntestdouble.js depends on when a string name is passed to `td.object()`.\n\nMore details here:\n  https://github.com/testdouble/testdouble.js/blob/master/docs/4-creating-test-doubles.md#objectobjectname\n\nDid you mean `td.object([\'' + name + '\'])`?');
  }
};

var ensureFunctionIsNotPassed = function ensureFunctionIsNotPassed() {
  return _log2.default.error('td.object', 'Functions are not valid arguments to `td.object` (as of testdouble@2.0.0). Please use `td.function()` or `td.constructor()` instead for creating fake functions.');
};

var ensureOtherGarbageIsNotPassed = function ensureOtherGarbageIsNotPassed() {
  return _log2.default.error('td.object', 'To create a fake object with td.object(), pass it a plain object that contains\nfunctions, an array of function names, or (if your runtime supports ES Proxy\nobjects) a string name.\n\nIf you passed td.object an instance of a custom type, consider passing the\ntype\'s constructor to `td.constructor()` instead.\n');
};

var withDefaults = function withDefaults(config) {
  return _lodashWrap2.default.extend({}, DEFAULT_OPTIONS, config);
};

var addToStringToDouble = function addToStringToDouble(fakeObject, nameOrType) {
  var name = nameOf(nameOrType);
  fakeObject.toString = function () {
    return '[test double object' + (name ? ' for "' + name + '"' : '') + ']';
  };
};

var nameOf = function nameOf(nameOrType) {
  return _lodashWrap2.default.isString(nameOrType) ? nameOrType : '';
};