'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('../create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var captor = {
    capture: (0, _create2.default)({
      name: 'captor.capture',
      matches: function matches(matcherArgs, actual) {
        captor.values = captor.values || [];
        captor.values.push(actual);
        captor.value = actual;
        return true;
      }
    })
  };
  return captor;
};