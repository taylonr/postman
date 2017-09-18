'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _imitate = require('../imitate');

var _imitate2 = _interopRequireDefault(_imitate);

var _remember = require('./remember');

var _remember2 = _interopRequireDefault(_remember);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (nameOrFunc) {
  if (_lodash2.default.isFunction(nameOrFunc)) return (0, _imitate2.default)(nameOrFunc);
  var double = (0, _create2.default)(nameOrFunc);
  (0, _remember2.default)(double);
  return double.fake;
};