_ =
  compact: require('lodash/fp/compact')
  extendAll: require('lodash/fp/extendAll')
  filter: require('lodash/fp/filter')
  find: require('lodash/fp/find')
  flow: require('lodash/fp/flow')
  invokeMap: require('lodash/fp/invokeMap')
  includes: require('lodash/fp/includes')
  reject: require('lodash/fp/reject')
  startsWith: require('lodash/fp/startsWith')
  uniq: require('lodash/uniq')
  tap: require('lodash/tap')
  values: require('lodash/values')

Module = require('module')
path = require('path')

originalLoad = Module._load
config = null
quibbles = {}
ignoredCallerFiles = []

module.exports = quibble = (request, stub) ->
  request = quibble.absolutify(request)
  Module._load = fakeLoad
  quibbles[request] =
    callerFile: hackErrorStackToGetCallerFile()
    stub: (if arguments.length < 2 then config.defaultFakeCreator(request) else stub)
  return quibbles[request].stub

quibble.config = (userConfig) ->
  config = _.extendAll {},
    defaultFakeCreator: (request) -> {}
  , userConfig
config = quibble.config()

# This method is a bit confusing. Call it from any spec-helper or intermediary
# library which may be calling on behalf of the test itself. Otherwise, the
# quibble stacktrace hack will determine that all the quibble calls are to
# be set up relative to that helper and not to the test itself
#
# Just to make it Really HardMode™ here, we also call hackErro...File with a
# flag that'll ensure calls to this function don't ignore existing ignores.
# We want to avoid the case that a spec helper calls this method twice and
# incidentally starts avoiding an arbitrary n other files on the call stack.
#
# Wow, this is really silly.
quibble.ignoreCallsFromThisFile = (file = hackErrorStackToGetCallerFile(false)) ->
  ignoredCallerFiles = _.uniq(ignoredCallerFiles.concat(file))

quibble.reset = (hard = false) ->
  Module._load = originalLoad
  quibbles = {}
  config = quibble.config()
  if hard
    ignoredCallerFiles = []

quibble.absolutify = (relativePath, parentFileName = hackErrorStackToGetCallerFile()) ->
  return relativePath if _.startsWith(relativePath, '/') || /^(\w|@)/.test(relativePath)
  path.resolve(path.dirname(parentFileName), relativePath)

# private

fakeLoad = (request, parent, isMain) ->
  request = if parent? then quibble.absolutify(request, parent.filename) else request
  if quibbles.hasOwnProperty(request)
    quibbles[request].stub
  else if requireWasCalledFromAFileThatHasQuibbledStuff()
    doWithoutCache request, parent, ->
      originalLoad(request, parent, isMain)
  else
    originalLoad(request, parent, isMain)

requireWasCalledFromAFileThatHasQuibbledStuff = ->
  for q in _.values(quibbles)
    return true if q.callerFile == hackErrorStackToGetCallerFile()

doWithoutCache = (request, parent, thingToDo) ->
  filename = Module._resolveFilename(request, parent)
  if Object.prototype.hasOwnProperty.call(Module._cache, filename)
    doAndRestoreCache(filename, thingToDo)
  else
    doAndDeleteCache(filename, thingToDo)

doAndRestoreCache = (filename, thingToDo) ->
  cachedThing = Module._cache[filename]
  delete Module._cache[filename]
  _.tap thingToDo(), ->
    Module._cache[filename] = cachedThing

doAndDeleteCache = (filename, thingToDo) ->
  _.tap thingToDo(), ->
    delete Module._cache[filename]

hackErrorStackToGetCallerFile = (includeGlobalIgnores = true) ->
  originalFunc = Error.prepareStackTrace
  try
    Error.prepareStackTrace = (e, stack) -> stack
    e = new Error()
    currentFile = e.stack[0].getFileName()
    _.flow([
      _.invokeMap('getFileName'),
      _.compact,
      _.reject((f) -> includeGlobalIgnores && _.includes(f, ignoredCallerFiles)),
      _.filter(path.isAbsolute),
      _.find((f) -> f != currentFile)
    ])(e.stack)
  finally
    Error.prepareStackTrace = originalFunc

