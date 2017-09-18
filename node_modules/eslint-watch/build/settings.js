'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Internal Settings */
var logger = (0, _logger2.default)('internal-settings');
var platform = _os2.default.platform();

var eslintPath = function loadEslintPath() {
  var cmd = platform === 'win32' ? '.cmd' : '';
  var eslintPath = void 0;
  try {
    eslintPath = _path2.default.join('./', `node_modules/.bin/eslint${cmd}`);
    _fs2.default.accessSync(eslintPath);
    logger.debug(`Eslint installed locally ${eslintPath}`);
  } catch (e) {
    logger.debug(e);
    try {
      eslintPath = _path2.default.join(process.env._, `../eslint${cmd}`);
      _fs2.default.accessSync(eslintPath);
      logger.debug(`Eslint installed globally ${eslintPath}`);
    } catch (e) {
      throw new Error('Eslint needs to be installed globally or locally in node_modules.');
    }
  }
  return eslintPath;
}();

var settings = {
  eslintPath,
  platform,
  isWindows: platform === 'win32'
};

logger.debug(settings);

exports.default = settings;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJwbGF0Zm9ybSIsImVzbGludFBhdGgiLCJsb2FkRXNsaW50UGF0aCIsImNtZCIsImpvaW4iLCJhY2Nlc3NTeW5jIiwiZGVidWciLCJlIiwicHJvY2VzcyIsImVudiIsIl8iLCJFcnJvciIsInNldHRpbmdzIiwiaXNXaW5kb3dzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFNQSxJQUFNQSxTQUFTLHNCQUFPLG1CQUFQLENBQWY7QUFDQSxJQUFNQyxXQUFXLGFBQUdBLFFBQUgsRUFBakI7O0FBRUEsSUFBTUMsYUFBYyxTQUFTQyxjQUFULEdBQXlCO0FBQzNDLE1BQU1DLE1BQU1ILGFBQWEsT0FBYixHQUF1QixNQUF2QixHQUFnQyxFQUE1QztBQUNBLE1BQUlDLG1CQUFKO0FBQ0EsTUFBSTtBQUNGQSxpQkFBYSxlQUFLRyxJQUFMLENBQVUsSUFBVixFQUFpQiwyQkFBMEJELEdBQUksRUFBL0MsQ0FBYjtBQUNBLGlCQUFHRSxVQUFILENBQWNKLFVBQWQ7QUFDQUYsV0FBT08sS0FBUCxDQUFjLDRCQUEyQkwsVUFBVyxFQUFwRDtBQUNELEdBSkQsQ0FJRSxPQUFPTSxDQUFQLEVBQVU7QUFDVlIsV0FBT08sS0FBUCxDQUFhQyxDQUFiO0FBQ0EsUUFBSTtBQUNGTixtQkFBYSxlQUFLRyxJQUFMLENBQVVJLFFBQVFDLEdBQVIsQ0FBWUMsQ0FBdEIsRUFBMEIsWUFBV1AsR0FBSSxFQUF6QyxDQUFiO0FBQ0EsbUJBQUdFLFVBQUgsQ0FBY0osVUFBZDtBQUNBRixhQUFPTyxLQUFQLENBQWMsNkJBQTRCTCxVQUFXLEVBQXJEO0FBQ0QsS0FKRCxDQUlFLE9BQU9NLENBQVAsRUFBVTtBQUNWLFlBQU0sSUFBSUksS0FBSixDQUFVLG1FQUFWLENBQU47QUFDRDtBQUNGO0FBQ0QsU0FBT1YsVUFBUDtBQUNELENBbEJrQixFQUFuQjs7QUFvQkEsSUFBTVcsV0FBVztBQUNmWCxZQURlO0FBRWZELFVBRmU7QUFHZmEsYUFBV2IsYUFBYTtBQUhULENBQWpCOztBQU1BRCxPQUFPTyxLQUFQLENBQWFNLFFBQWI7O2tCQUVlQSxRIiwiZmlsZSI6InNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogSW50ZXJuYWwgU2V0dGluZ3MgKi9cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyKCdpbnRlcm5hbC1zZXR0aW5ncycpO1xuY29uc3QgcGxhdGZvcm0gPSBvcy5wbGF0Zm9ybSgpO1xuXG5jb25zdCBlc2xpbnRQYXRoID0gKGZ1bmN0aW9uIGxvYWRFc2xpbnRQYXRoKCl7XG4gIGNvbnN0IGNtZCA9IHBsYXRmb3JtID09PSAnd2luMzInID8gJy5jbWQnIDogJyc7XG4gIGxldCBlc2xpbnRQYXRoO1xuICB0cnkge1xuICAgIGVzbGludFBhdGggPSBwYXRoLmpvaW4oJy4vJywgYG5vZGVfbW9kdWxlcy8uYmluL2VzbGludCR7Y21kfWApO1xuICAgIGZzLmFjY2Vzc1N5bmMoZXNsaW50UGF0aCk7XG4gICAgbG9nZ2VyLmRlYnVnKGBFc2xpbnQgaW5zdGFsbGVkIGxvY2FsbHkgJHtlc2xpbnRQYXRofWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGUpO1xuICAgIHRyeSB7XG4gICAgICBlc2xpbnRQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuZW52Ll8sIGAuLi9lc2xpbnQke2NtZH1gKTtcbiAgICAgIGZzLmFjY2Vzc1N5bmMoZXNsaW50UGF0aCk7XG4gICAgICBsb2dnZXIuZGVidWcoYEVzbGludCBpbnN0YWxsZWQgZ2xvYmFsbHkgJHtlc2xpbnRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXNsaW50IG5lZWRzIHRvIGJlIGluc3RhbGxlZCBnbG9iYWxseSBvciBsb2NhbGx5IGluIG5vZGVfbW9kdWxlcy4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVzbGludFBhdGg7XG59KSgpO1xuXG5jb25zdCBzZXR0aW5ncyA9IHtcbiAgZXNsaW50UGF0aCxcbiAgcGxhdGZvcm0sXG4gIGlzV2luZG93czogcGxhdGZvcm0gPT09ICd3aW4zMicsXG59O1xuXG5sb2dnZXIuZGVidWcoc2V0dGluZ3MpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXR0aW5ncztcbiJdfQ==