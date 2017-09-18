'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _double = require('../value/double');

var _double2 = _interopRequireDefault(_double);

var _callLog = require('../value/call-log');

var _callLog2 = _interopRequireDefault(_callLog);

var _call = require('../value/call');

var _call2 = _interopRequireDefault(_call);

var _stubbingRegister = require('../value/stubbing-register');

var _stubbingRegister2 = _interopRequireDefault(_stubbingRegister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (nameOrFunc) {
  var name = deriveName(nameOrFunc);
  var real = _lodash2.default.isFunction(nameOrFunc) ? nameOrFunc : null;
  var double = new _double2.default(name, real, _lodash2.default.tap(function testDouble() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var call = new _call2.default(this, args);
    _callLog2.default.instance.log(double, call);
    return _stubbingRegister2.default.instance.satisfy(double, call);
  }, function (fakeFunction) {
    fakeFunction.toString = function () {
      return double.fullName == null ? '[test double (unnamed)]' : '[test double for "' + double.fullName + '"]';
    };
  }));
  return double;
};

var deriveName = function deriveName(nameOrFunc) {
  var name = _lodash2.default.isFunction(nameOrFunc) ? nameOrFunc.name : nameOrFunc;
  return _lodash2.default.isEmpty(name) ? null : name;
};