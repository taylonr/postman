'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _anything = require('./anything');

var _anything2 = _interopRequireDefault(_anything);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (args) {
  var joiner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ', ';
  var wrapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return _lodashWrap2.default.map(args, function (arg) {
    return '' + wrapper + (0, _anything2.default)(arg) + wrapper;
  }).join(joiner);
};