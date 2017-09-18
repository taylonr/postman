'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('../../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isFakeable = require('./is-fakeable');

var _isFakeable2 = _interopRequireDefault(_isFakeable);

var _gatherProps = require('./gather-props');

var _gatherProps2 = _interopRequireDefault(_gatherProps);

var _copyProps = require('./copy-props');

var _copyProps2 = _interopRequireDefault(_copyProps);

var _chainPrototype = require('./chain-prototype');

var _chainPrototype2 = _interopRequireDefault(_chainPrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (original, target, overwriteChild) {
  if (!(0, _isFakeable2.default)(target)) return;

  if (_lodash2.default.isArray(target)) {
    _lodash2.default.each(original, function (item, index) {
      return target.push(overwriteChild(item, '[' + index + ']'));
    });
  } else {
    (0, _copyProps2.default)(target, (0, _gatherProps2.default)(original), function (name, originalValue) {
      return (0, _chainPrototype2.default)(original, target, name, originalValue, overwriteChild(originalValue, '.' + name));
    });
  }
};