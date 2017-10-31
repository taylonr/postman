'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _isMatcher = require('../matchers/is-matcher');

var _isMatcher2 = _interopRequireDefault(_isMatcher);

var _stringifyObjectEs = require('stringify-object-es5');

var _stringifyObjectEs2 = _interopRequireDefault(_stringifyObjectEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (anything) {
  if (_lodashWrap2.default.isString(anything)) {
    return stringifyString(anything);
  } else if ((0, _isMatcher2.default)(anything)) {
    return anything.__name;
  } else {
    return (0, _stringifyObjectEs2.default)(anything, {
      indent: '  ',
      singleQuotes: false,
      inlineCharacterLimit: 65,
      transform: function transform(obj, prop, originalResult) {
        if ((0, _isMatcher2.default)(obj[prop])) {
          return obj[prop].__name;
        } else {
          return originalResult;
        }
      }
    });
  }
};

var stringifyString = function stringifyString(string) {
  return _lodashWrap2.default.includes(string, '\n') ? '"""\n' + string + '\n"""' : '"' + string.replace(new RegExp('"', 'g'), '\\"') + '"';
};