'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _textTable = require('text-table');

var _textTable2 = _interopRequireDefault(_textTable);

var _characters = require('./helpers/characters');

var _characters2 = _interopRequireDefault(_characters);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template Author Sindre Sorhus @eslint
// https://github.com/sindresorhus/eslint-stylish
var logger = (0, _logger2.default)('simple-detail');

logger.debug('loaded');

var tableSettings = {
  align: ['', '', 'r'],
  stringLength: function stringLength(str) {
    return _chalk2.default.stripColor(str).length;
  }
};

function pluralize(word, count) {
  return count === 1 ? word : word + 's';
}

function simpleDetail(results) {
  var totalErrors = 0;
  var totalWarnings = 0;
  var output = '';
  var cleanMsg = '';
  var messageTime = _chalk2.default.dim(`(${new Date().toLocaleTimeString()})`);
  logger.debug(results);
  results.forEach(function (result) {
    var messages = result.messages;
    var warnings = 0;
    var errors = 0;
    if (!messages.length) {
      return;
    }

    var tableText = (0, _textTable2.default)(messages.map(function (message) {
      function getMessageType(msg) {
        if (msg.fatal || msg.severity === 2) {
          totalErrors++;
          errors++;
          return _chalk2.default.red(_characters2.default.x);
        }

        totalWarnings++;
        warnings++;
        return _chalk2.default.yellow(_characters2.default.ex);
      }

      return ['', getMessageType(message), message.line || 0, message.column || 0, _chalk2.default.dim(message.message.replace(/\.$/, '')), _chalk2.default.dim(message.ruleId || '')];
    }), tableSettings);

    output += _chalk2.default.white.underline(result.filePath) + ` (${_chalk2.default.red(errors)}/${_chalk2.default.yellow(warnings)})${_characters2.default.endLine}`;
    output += tableText.split(_characters2.default.endLine).map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return _chalk2.default.dim(`${p1}:${p2}`);
      });
    }).join(_characters2.default.endLine) + _characters2.default.endLine + _characters2.default.endLine;
  });

  if (totalErrors) {
    output += _chalk2.default.red(`${_characters2.default.x} ${totalErrors} ${pluralize('error', totalErrors)} `);
  }
  if (totalWarnings) {
    output += _chalk2.default.yellow(`${_characters2.default.ex} ${totalWarnings} ${pluralize('warning', totalWarnings)} `);
  }

  if (results.length > 0 || !results.length) {
    cleanMsg = _chalk2.default.green(`${_characters2.default.check} Clean`) + ` ${messageTime}`;
  }

  output = totalErrors || totalWarnings ? `${output}${messageTime}${_characters2.default.endLine}` : cleanMsg;

  return output;
}

exports.default = simpleDetail;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL3NpbXBsZS1kZXRhaWwuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiZGVidWciLCJ0YWJsZVNldHRpbmdzIiwiYWxpZ24iLCJzdHJpbmdMZW5ndGgiLCJzdHIiLCJzdHJpcENvbG9yIiwibGVuZ3RoIiwicGx1cmFsaXplIiwid29yZCIsImNvdW50Iiwic2ltcGxlRGV0YWlsIiwicmVzdWx0cyIsInRvdGFsRXJyb3JzIiwidG90YWxXYXJuaW5ncyIsIm91dHB1dCIsImNsZWFuTXNnIiwibWVzc2FnZVRpbWUiLCJkaW0iLCJEYXRlIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiZm9yRWFjaCIsInJlc3VsdCIsIm1lc3NhZ2VzIiwid2FybmluZ3MiLCJlcnJvcnMiLCJ0YWJsZVRleHQiLCJtYXAiLCJtZXNzYWdlIiwiZ2V0TWVzc2FnZVR5cGUiLCJtc2ciLCJmYXRhbCIsInNldmVyaXR5IiwicmVkIiwieCIsInllbGxvdyIsImV4IiwibGluZSIsImNvbHVtbiIsInJlcGxhY2UiLCJydWxlSWQiLCJ3aGl0ZSIsInVuZGVybGluZSIsImZpbGVQYXRoIiwiZW5kTGluZSIsInNwbGl0IiwiZWwiLCJtIiwicDEiLCJwMiIsImpvaW4iLCJncmVlbiIsImNoZWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBTkE7QUFDQTtBQU9BLElBQU1BLFNBQVMsc0JBQU8sZUFBUCxDQUFmOztBQUVBQSxPQUFPQyxLQUFQLENBQWEsUUFBYjs7QUFFQSxJQUFJQyxnQkFBZ0I7QUFDbEJDLFNBQU8sQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEdBQVQsQ0FEVztBQUVsQkMsZ0JBQWMsc0JBQUNDLEdBQUQ7QUFBQSxXQUFTLGdCQUFNQyxVQUFOLENBQWlCRCxHQUFqQixFQUFzQkUsTUFBL0I7QUFBQTtBQUZJLENBQXBCOztBQUtBLFNBQVNDLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxLQUF6QixF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LEVBQTBDO0FBQ3hDUyxlQUFXLGdCQUFNbUMsS0FBTixDQUFhLEdBQUUscUJBQUVDLEtBQU0sUUFBdkIsSUFBbUMsSUFBR25DLFdBQVksRUFBN0Q7QUFDRDs7QUFFREYsV0FBVUYsZUFBZUMsYUFBaEIsR0FBa0MsR0FBRUMsTUFBTyxHQUFFRSxXQUFZLEdBQUUscUJBQUUyQixPQUFRLEVBQXJFLEdBQXlFNUIsUUFBbEY7O0FBRUEsU0FBT0QsTUFBUDtBQUNEOztrQkFFY0osWSIsImZpbGUiOiJzaW1wbGUtZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGVtcGxhdGUgQXV0aG9yIFNpbmRyZSBTb3JodXMgQGVzbGludFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9lc2xpbnQtc3R5bGlzaFxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCB0YWJsZSBmcm9tICd0ZXh0LXRhYmxlJztcblxuaW1wb3J0IGMgZnJvbSAnLi9oZWxwZXJzL2NoYXJhY3RlcnMnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoJ3NpbXBsZS1kZXRhaWwnKTtcblxubG9nZ2VyLmRlYnVnKCdsb2FkZWQnKTtcblxubGV0IHRhYmxlU2V0dGluZ3MgPSB7XG4gIGFsaWduOiBbJycsICcnLCAnciddLFxuICBzdHJpbmdMZW5ndGg6IChzdHIpID0+IGNoYWxrLnN0cmlwQ29sb3Ioc3RyKS5sZW5ndGhcbn07XG5cbmZ1bmN0aW9uIHBsdXJhbGl6ZSh3b3JkLCBjb3VudCkge1xuICByZXR1cm4gKGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncycpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVEZXRhaWwocmVzdWx0cykge1xuICBsZXQgdG90YWxFcnJvcnMgPSAwO1xuICBsZXQgdG90YWxXYXJuaW5ncyA9IDA7XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgbGV0IGNsZWFuTXNnID0gJyc7XG4gIGxldCBtZXNzYWdlVGltZSA9IGNoYWxrLmRpbShgKCR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX0pYCk7XG4gIGxvZ2dlci5kZWJ1ZyhyZXN1bHRzKTtcbiAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBsZXQgbWVzc2FnZXMgPSByZXN1bHQubWVzc2FnZXM7XG4gICAgbGV0IHdhcm5pbmdzID0gMDtcbiAgICBsZXQgZXJyb3JzID0gMDtcbiAgICBpZiAoIW1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB0YWJsZVRleHQgPSB0YWJsZShcbiAgICAgIG1lc3NhZ2VzLm1hcChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXNzYWdlVHlwZShtc2cpIHtcbiAgICAgICAgICBpZiAobXNnLmZhdGFsIHx8IG1zZy5zZXZlcml0eSA9PT0gMikge1xuICAgICAgICAgICAgdG90YWxFcnJvcnMrKztcbiAgICAgICAgICAgIGVycm9ycysrO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWxrLnJlZChjLngpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvdGFsV2FybmluZ3MrKztcbiAgICAgICAgICB3YXJuaW5ncysrO1xuICAgICAgICAgIHJldHVybiBjaGFsay55ZWxsb3coYy5leCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gWycnLFxuICAgICAgICAgIGdldE1lc3NhZ2VUeXBlKG1lc3NhZ2UpLFxuICAgICAgICAgIG1lc3NhZ2UubGluZSB8fCAwLFxuICAgICAgICAgIG1lc3NhZ2UuY29sdW1uIHx8IDAsXG4gICAgICAgICAgY2hhbGsuZGltKG1lc3NhZ2UubWVzc2FnZS5yZXBsYWNlKC9cXC4kLywgJycpKSxcbiAgICAgICAgICBjaGFsay5kaW0obWVzc2FnZS5ydWxlSWQgfHwgJycpXTtcbiAgICAgIH0pLCB0YWJsZVNldHRpbmdzKTtcblxuICAgIG91dHB1dCArPSBjaGFsay53aGl0ZS51bmRlcmxpbmUocmVzdWx0LmZpbGVQYXRoKSArIGAgKCR7Y2hhbGsucmVkKGVycm9ycyl9LyR7Y2hhbGsueWVsbG93KHdhcm5pbmdzKX0pJHtjLmVuZExpbmV9YDtcbiAgICBvdXRwdXQgKz0gdGFibGVUZXh0LnNwbGl0KGMuZW5kTGluZSkubWFwKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGVsLnJlcGxhY2UoLyhcXGQrKVxccysoXFxkKykvLCAobSwgcDEsIHAyKSA9PiBjaGFsay5kaW0oYCR7cDF9OiR7cDJ9YCkpO1xuICAgIH0pLmpvaW4oYy5lbmRMaW5lKSArIGMuZW5kTGluZSArIGMuZW5kTGluZTtcbiAgfSk7XG5cbiAgaWYodG90YWxFcnJvcnMpIHtcbiAgICBvdXRwdXQgKz0gY2hhbGsucmVkKGAke2MueH0gJHt0b3RhbEVycm9yc30gJHtwbHVyYWxpemUoJ2Vycm9yJywgdG90YWxFcnJvcnMpfSBgKTtcbiAgfVxuICBpZiAodG90YWxXYXJuaW5ncykge1xuICAgIG91dHB1dCArPSBjaGFsay55ZWxsb3coYCR7Yy5leH0gJHt0b3RhbFdhcm5pbmdzfSAke3BsdXJhbGl6ZSgnd2FybmluZycsIHRvdGFsV2FybmluZ3MpfSBgKTtcbiAgfVxuXG4gIGlmKHJlc3VsdHMubGVuZ3RoID4gMCB8fCAhcmVzdWx0cy5sZW5ndGgpIHtcbiAgICBjbGVhbk1zZyA9IGNoYWxrLmdyZWVuKGAke2MuY2hlY2t9IENsZWFuYCkgKyBgICR7bWVzc2FnZVRpbWV9YDtcbiAgfVxuXG4gIG91dHB1dCA9ICh0b3RhbEVycm9ycyB8fCB0b3RhbFdhcm5pbmdzKSA/IGAke291dHB1dH0ke21lc3NhZ2VUaW1lfSR7Yy5lbmRMaW5lfWAgOiBjbGVhbk1zZztcblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaW1wbGVEZXRhaWw7XG4iXX0=