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

var _stubbings = require('./store/stubbings');

var _stubbings2 = _interopRequireDefault(_stubbings);

var _imitate = require('./imitate');

var _imitate2 = _interopRequireDefault(_imitate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (nameOrFunc, __optionalName) {
  return _lodashWrap2.default.isFunction(nameOrFunc) ? (0, _imitate2.default)(nameOrFunc) : createTestDoubleNamed(nameOrFunc || __optionalName);
};

var createTestDoubleNamed = function createTestDoubleNamed(name) {
  return _lodashWrap2.default.tap(createTestDoubleFunction(), function (testDouble) {
    var entry = _store2.default.for(testDouble, true);
    if (name != null) {
      entry.name = name;
      testDouble.toString = function () {
        return '[test double for "' + name + '"]';
      };
    } else {
      testDouble.toString = function () {
        return '[test double (unnamed)]';
      };
    }
  });
};

var createTestDoubleFunction = function createTestDoubleFunction() {
  return function testDouble() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _calls2.default.log(testDouble, args, this);
    return _stubbings2.default.invoke(testDouble, args, this);
  };
};