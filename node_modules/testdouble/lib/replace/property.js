'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (object, property, manualReplacement) {
  var isManual = arguments.length > 2;
  var realThingExists = object[property] || object.hasOwnProperty(property);

  if (isManual || realThingExists) {
    var realThing = object[property];
    return _lodashWrap2.default.tap(getFake(isManual, property, manualReplacement, realThing), function (fakeThing) {
      object[property] = fakeThing;
      _reset2.default.onNextReset(function () {
        if (realThingExists) {
          object[property] = realThing;
        } else {
          delete object[property];
        }
      });
    });
  } else {
    _log2.default.error('td.replace', 'No "' + property + '" property was found.');
  }
};

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _imitate = require('../imitate');

var _imitate2 = _interopRequireDefault(_imitate);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var _reset = require('../reset');

var _reset2 = _interopRequireDefault(_reset);

var _anything = require('../stringify/anything');

var _anything2 = _interopRequireDefault(_anything);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFake = function getFake(isManual, property, manualReplacement, realThing) {
  if (isManual) {
    warnIfTypeMismatch(property, manualReplacement, realThing);
    return manualReplacement;
  } else {
    return (0, _imitate2.default)(realThing, [property]);
  }
};

var warnIfTypeMismatch = function warnIfTypeMismatch(property, fakeThing, realThing) {
  var fakeType = typeof fakeThing === 'undefined' ? 'undefined' : _typeof(fakeThing);
  var realType = typeof realThing === 'undefined' ? 'undefined' : _typeof(realThing);
  if (realThing !== undefined && fakeType !== realType) {
    _log2.default.warn('td.replace', 'property "' + property + '" ' + (0, _anything2.default)(realThing) + ' (' + _lodashWrap2.default.capitalize(realType) + ') was replaced with ' + (0, _anything2.default)(fakeThing) + ', which has a different type (' + _lodashWrap2.default.capitalize(fakeType) + ').');
  }
};