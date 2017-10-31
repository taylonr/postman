'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _imitate = require('./imitate');

var _imitate2 = _interopRequireDefault(_imitate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (typeOrNames) {
  return _lodashWrap2.default.isFunction(typeOrNames) ? (0, _imitate2.default)(typeOrNames) : fakeConstructorFromNames(typeOrNames);
};

var fakeConstructorFromNames = function fakeConstructorFromNames(funcNames) {
  return _lodashWrap2.default.tap((0, _function2.default)('(unnamed constructor)'), function (fakeConstructor) {
    fakeConstructor.prototype.toString = function () {
      return '[test double instance of constructor]';
    };

    _lodashWrap2.default.each(funcNames, function (funcName) {
      fakeConstructor.prototype[funcName] = (0, _function2.default)('#' + funcName);
    });
  });
};