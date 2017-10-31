'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashWrap = require('../util/lodash-wrap');

var _lodashWrap2 = _interopRequireDefault(_lodashWrap);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeEmitter = new _events.EventEmitter();
var globalStore = [];

exports.default = {
  onReset: function onReset(func) {
    storeEmitter.on('reset', func);
  },
  reset: function reset() {
    globalStore = [];
    storeEmitter.emit('reset');
  },
  for: function _for(testDouble) {
    var createIfNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var entry = _lodashWrap2.default.find(globalStore, { testDouble: testDouble });
    if (entry) {
      return entry;
    } else if (createIfNew) {
      return _lodashWrap2.default.tap({
        testDouble: testDouble,
        stubbings: [],
        calls: [],
        verifications: []
      }, function (newEntry) {
        return globalStore.push(newEntry);
      });
    }
  }
};