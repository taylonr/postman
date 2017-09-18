'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isFakeable = require('./is-fakeable');

var _isFakeable2 = _interopRequireDefault(_isFakeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (thing) {
  var originalThing = thing;
  var props = {};

  while ((0, _isFakeable2.default)(thing) && !isNativePrototype(thing)) {
    Object.getOwnPropertyNames(thing).forEach(function (propName) {
      if (!props[propName] && propName !== 'constructor') {
        props[propName] = Object.getOwnPropertyDescriptor(thing, propName);
      }
    });
    thing = Object.getPrototypeOf(thing);
  }
  removeAbsentProperties(props, originalThing);
  return props;
};

var isNativePrototype = function isNativePrototype(thing) {
  if (!_lodash2.default.isFunction(thing.isPrototypeOf)) return false;
  return _lodash2.default.some([Object, Function], function (nativeType) {
    return thing.isPrototypeOf(nativeType);
  });
};

var removeAbsentProperties = function removeAbsentProperties(props, originalThing) {
  _lodash2.default.each(props, function (value, name) {
    if (!(name in originalThing)) {
      delete props[name];
    }
  });
};