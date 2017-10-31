'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('../create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: 'argThat',
  matches: function matches(matcherArgs, actual) {
    var predicate = matcherArgs[0];
    return predicate(actual);
  }
});