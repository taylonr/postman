'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imitate;

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _initializeNames = require('./initialize-names');

var _initializeNames2 = _interopRequireDefault(_initializeNames);

var _createImitation = require('./create-imitation');

var _createImitation2 = _interopRequireDefault(_createImitation);

var _overwriteChildren = require('./overwrite-children');

var _overwriteChildren2 = _interopRequireDefault(_overwriteChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imitate(original, names) {
  var encounteredObjects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _es6Map2.default();

  if (encounteredObjects.has(original)) return encounteredObjects.get(original);
  names = (0, _initializeNames2.default)(original, names);
  var target = (0, _createImitation2.default)(original, names);
  encounteredObjects.set(original, target);
  (0, _overwriteChildren2.default)(original, target, function (originalValue, name) {
    return imitate(originalValue, names.concat(name), encounteredObjects);
  });
  return target;
}