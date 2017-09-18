'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('./util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _anything = require('./stringify/anything');

var _anything2 = _interopRequireDefault(_anything);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = {
  ignoreWarnings: false,
  promiseConstructor: global.Promise,
  suppressErrors: false
};
var DELETED_OPTIONS = ['extendWhenReplacingConstructors'];

var configData = _lodashWrap2.default.extend({}, DEFAULTS);

exports.default = _lodashWrap2.default.tap(function (overrides) {
  deleteDeletedOptions(overrides);
  ensureOverridesExist(overrides);
  return _lodashWrap2.default.extend(configData, overrides);
}, function (config) {
  config.reset = function () {
    configData = _lodashWrap2.default.extend({}, DEFAULTS);
  };
});


var deleteDeletedOptions = function deleteDeletedOptions(overrides) {
  _lodashWrap2.default.each(overrides, function (val, key) {
    if (_lodashWrap2.default.includes(DELETED_OPTIONS, key)) {
      _log2.default.warn('td.config', '"' + key + '" is no longer a valid configuration key. Remove it from your calls to td.config() or it may throw an error in the future. For more information, try hunting around our GitHub repo for it:\n\n  https://github.com/testdouble/testdouble.js/search?q=' + key);
      delete overrides[key];
    }
  });
};

var ensureOverridesExist = function ensureOverridesExist(overrides) {
  _lodashWrap2.default.each(overrides, function (val, key) {
    if (!configData.hasOwnProperty(key)) {
      _log2.default.error('td.config', '"' + key + '" is not a valid configuration key (valid keys are: ' + (0, _anything2.default)(_lodashWrap2.default.keys(configData)) + ')');
    }
  });
};