'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _function = require('../function');

var _function2 = _interopRequireDefault(_function);

var _isGenerator = require('./is-generator');

var _isGenerator2 = _interopRequireDefault(_isGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (original, names) {
  if (_lodash2.default.isArray(original) || _lodash2.default.isArguments(original)) {
    return [];
  } else if (_lodash2.default.isFunction(original)) {
    if ((0, _isGenerator2.default)(original)) {
      return original;
    } else {
      return (0, _function2.default)(names.join('') || '(anonymous function)');
    }
  } else {
    return _lodash2.default.clone(original);
  }
};