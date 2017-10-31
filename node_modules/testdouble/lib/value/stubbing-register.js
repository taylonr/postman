'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _satisfy2 = require('../satisfy');

var _satisfy3 = _interopRequireDefault(_satisfy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var StubbingRegister = function () {
  _createClass(StubbingRegister, null, [{
    key: 'reset',
    value: function reset() {
      instance = null;
    }
  }, {
    key: 'instance',
    get: function get() {
      if (instance) return instance;
      instance = new StubbingRegister();
      return instance;
    }
  }]);

  function StubbingRegister() {
    _classCallCheck(this, StubbingRegister);

    this.stubbings = new _es6Map2.default();
  }

  _createClass(StubbingRegister, [{
    key: 'add',
    value: function add(double, stubbing) {
      if (this.stubbings.has(double)) {
        this.stubbings.get(double).push(stubbing);
      } else {
        this.stubbings.set(double, [stubbing]);
      }
    }
  }, {
    key: 'satisfy',
    value: function satisfy(double, call) {
      return (0, _satisfy3.default)(call, this.stubbings.get(double));
    }
  }, {
    key: 'get',
    value: function get(double) {
      return this.stubbings.get(double);
    }
  }]);

  return StubbingRegister;
}();

exports.default = StubbingRegister;