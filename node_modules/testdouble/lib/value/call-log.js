'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var CallLog = function () {
  _createClass(CallLog, null, [{
    key: 'reset',
    value: function reset() {
      instance = null;
    }
  }, {
    key: 'instance',
    get: function get() {
      if (instance) return instance;
      instance = new CallLog();
      return instance;
    }
  }]);

  function CallLog() {
    _classCallCheck(this, CallLog);

    this.calls = new _es6Map2.default();
    this.callHistory = [];
  }

  _createClass(CallLog, [{
    key: 'log',
    value: function log(double, call) {
      this.callHistory.push({ double: double, call: call });
      if (this.calls.has(double)) {
        this.calls.get(double).push(call);
      } else {
        this.calls.set(double, [call]);
      }
    }
  }, {
    key: 'for',
    value: function _for(double) {
      return this.calls.get(double);
    }
  }, {
    key: 'pop',
    value: function pop() {
      var lastCall = this.callHistory.pop();
      if (lastCall && this.calls.has(lastCall.double)) {
        this.calls.get(lastCall.double).pop();
      }
      return lastCall;
    }
  }]);

  return CallLog;
}();

exports.default = CallLog;