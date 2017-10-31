'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ensureRehearsal = require('./ensure-rehearsal');

var _ensureRehearsal2 = _interopRequireDefault(_ensureRehearsal);

var _chainStubbing = require('./chain-stubbing');

var _chainStubbing2 = _interopRequireDefault(_chainStubbing);

var _addImpliedCallbackArgIfNecessary = require('./add-implied-callback-arg-if-necessary');

var _addImpliedCallbackArgIfNecessary2 = _interopRequireDefault(_addImpliedCallbackArgIfNecessary);

var _callLog = require('../value/call-log');

var _callLog2 = _interopRequireDefault(_callLog);

var _stubbingRegister = require('../value/stubbing-register');

var _stubbingRegister2 = _interopRequireDefault(_stubbingRegister);

var _stubbing = require('../value/stubbing');

var _stubbing2 = _interopRequireDefault(_stubbing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (__rehearseInvocationHere__, options) {
  var rehearsal = _callLog2.default.instance.pop();
  (0, _ensureRehearsal2.default)(rehearsal);
  return (0, _chainStubbing2.default)(function (type, outcomes) {
    _stubbingRegister2.default.instance.add(rehearsal.double, new _stubbing2.default(type, (0, _addImpliedCallbackArgIfNecessary2.default)(type, rehearsal.call.args), outcomes, options));
  });
};