'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path, stub) {
  if (arguments.length > 1) {
    return (0, _quibble2.default)(path, stub);
  }
  var realThing = requireAt(path);
  var fakeThing = (0, _imitate2.default)(realThing, [path + ': ' + nameFor(realThing)]);
  (0, _quibble2.default)(path, fakeThing);
  return fakeThing;
};

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _imitate = require('../imitate');

var _imitate2 = _interopRequireDefault(_imitate);

var _quibble = require('quibble');

var _quibble2 = _interopRequireDefault(_quibble);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_quibble2.default.ignoreCallsFromThisFile();

var nameFor = function nameFor(realThing) {
  if (!_lodash2.default.isFunction(realThing)) return '';
  return realThing.name ? realThing.name : '(anonymous function)';
};

var requireAt = function requireAt(path) {
  try {
    // 1. Try just following quibble's inferred path
    return require(_quibble2.default.absolutify(path));
  } catch (e) {
    // 2. Try including npm packages
    return require(_resolve2.default.sync(path, { basedir: process.cwd() }));
  }
};