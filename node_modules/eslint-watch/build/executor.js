'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('executor');

exports.default = {
  // https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
  spawnSync: function spawnSync(cmd, args, childOptions) {
    logger.debug(cmd, args);
    var child = (0, _child_process.spawnSync)(cmd, args, childOptions);
    if (child.error) {
      logger.debug('Critical error occurred.');
      throw new Error(child.stderr.toString());
    }
    return {
      exitCode: child.status,
      message: child.stdout ? child.stdout.toString() : ''
    };
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRvci5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJzcGF3blN5bmMiLCJjbWQiLCJhcmdzIiwiY2hpbGRPcHRpb25zIiwiZGVidWciLCJjaGlsZCIsImVycm9yIiwiRXJyb3IiLCJzdGRlcnIiLCJ0b1N0cmluZyIsImV4aXRDb2RlIiwic3RhdHVzIiwibWVzc2FnZSIsInN0ZG91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7Ozs7OztBQUNBLElBQU1BLFNBQVMsc0JBQU8sVUFBUCxDQUFmOztrQkFFZTtBQUNiO0FBQ0FDLGFBQVcsbUJBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFZQyxZQUFaLEVBQTZCO0FBQ3RDSixXQUFPSyxLQUFQLENBQWFILEdBQWIsRUFBa0JDLElBQWxCO0FBQ0EsUUFBTUcsUUFBUSw4QkFBVUosR0FBVixFQUFlQyxJQUFmLEVBQXFCQyxZQUFyQixDQUFkO0FBQ0EsUUFBR0UsTUFBTUMsS0FBVCxFQUFlO0FBQ2JQLGFBQU9LLEtBQVAsQ0FBYSwwQkFBYjtBQUNBLFlBQU0sSUFBSUcsS0FBSixDQUFVRixNQUFNRyxNQUFOLENBQWFDLFFBQWIsRUFBVixDQUFOO0FBQ0Q7QUFDRCxXQUFPO0FBQ0xDLGdCQUFVTCxNQUFNTSxNQURYO0FBRUxDLGVBQVNQLE1BQU1RLE1BQU4sR0FBZVIsTUFBTVEsTUFBTixDQUFhSixRQUFiLEVBQWYsR0FBeUM7QUFGN0MsS0FBUDtBQUlEO0FBYlksQyIsImZpbGUiOiJleGVjdXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignZXhlY3V0b3InKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBodHRwczovL25vZGVqcy5vcmcvYXBpL2NoaWxkX3Byb2Nlc3MuaHRtbCNjaGlsZF9wcm9jZXNzX2NoaWxkX3Byb2Nlc3Nfc3Bhd25zeW5jX2NvbW1hbmRfYXJnc19vcHRpb25zXG4gIHNwYXduU3luYzogKGNtZCwgYXJncywgY2hpbGRPcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKGNtZCwgYXJncyk7XG4gICAgY29uc3QgY2hpbGQgPSBzcGF3blN5bmMoY21kLCBhcmdzLCBjaGlsZE9wdGlvbnMpO1xuICAgIGlmKGNoaWxkLmVycm9yKXtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnQ3JpdGljYWwgZXJyb3Igb2NjdXJyZWQuJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoY2hpbGQuc3RkZXJyLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZXhpdENvZGU6IGNoaWxkLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IGNoaWxkLnN0ZG91dCA/IGNoaWxkLnN0ZG91dC50b1N0cmluZygpIDogJydcbiAgICB9O1xuICB9XG59O1xuIl19