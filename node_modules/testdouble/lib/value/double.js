'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('../wrap/lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Double = function () {
  function Double(name, real, fake) {
    _classCallCheck(this, Double);

    this.name = name;
    this.real = real;
    this.fake = fake;
    this.parent = undefined;
    this.children = new Set();
  }

  _createClass(Double, [{
    key: 'addChild',
    value: function addChild(child) {
      this.children.add(child);
      child.parent = this;
    }
  }, {
    key: 'fullName',
    get: function get() {
      if (!_lodash2.default.some(_lodash2.default.map(this.ancestors, 'name'))) return this.name;
      return _lodash2.default.map(this.ancestors.concat(this), function (ancestor) {
        return ancestor.name == null ? '(unnamed)' : ancestor.name;
      }).join('.');
    }
  }, {
    key: 'ancestors',
    get: function get() {
      if (!this.parent) return [];
      return this.parent.ancestors.concat(this.parent);
    }
  }]);

  return Double;
}();

exports.default = Double;