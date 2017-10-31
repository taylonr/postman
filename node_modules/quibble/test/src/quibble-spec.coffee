originalLoad = require('module')._load
quibble = require('../../src/quibble')

describe 'quibble', ->
  describe 'basic behavior', ->
    Given -> @stubbing = quibble('./../fixtures/a-function', -> "kek")
    Then -> @stubbing() == "kek"
    Then -> require('./../fixtures/a-function')() == "kek"
    Then -> require('../fixtures/a-function')() == "kek"
    Then -> require('../../test/fixtures/a-function')() == "kek"
    Then -> require('./../fixtures/b-function')() == "b function"

  describe '.config', ->
    describe 'defaultFakeCreator', ->
      Given -> quibble.config(defaultFakeCreator: -> 'lol')
      When -> @stubbing = quibble('./lol')
      Then -> @stubbing == 'lol'
      Then -> require('./lol') == 'lol'

  describe '.reset', ->
    it 'ensure it clears its internal data structure of quibbles', ->
      quibble('../fixtures/a-function', -> "ha")
      expect(require('../fixtures/requires-a-function')()).to.eq("loaded ha")

      quibble.reset()

      expect(require('../fixtures/a-function')()).to.eq("the real function")
      expect(require('../fixtures/requires-a-function')()).to.eq("loaded the real function")

    it 'can quibble again after reset', ->
      quibble('../fixtures/a-function', -> "ha")
      expect(require('../fixtures/a-function')()).to.eq("ha")
      expect(require('../fixtures/requires-a-function')()).to.eq("loaded ha")

      quibble.reset()

      quibble('./some-other-thing')
      expect(require('../fixtures/a-function')()).to.eq("the real function")
      quibble('../fixtures/a-function', -> "ha")
      expect(require('../fixtures/requires-a-function')()).to.eq("loaded ha")

    context 'without a reset', ->
      Given -> quibble('./../fixtures/a-function', -> "ha")
      When -> quibble('./some-other-thing')
      Then -> require('../fixtures/a-function')() == "ha"

  describe 'blowing the require cache', ->
    context 'requiring-an-already-cached-thing and then quibbling it', ->
      Given -> requiresAFunction = require('../fixtures/requires-a-function')
      Given -> quibble('./../fixtures/a-function', -> 'a fake function')
      Given -> @quibbledRequiresAFunction = require('../fixtures/requires-a-function')
      When -> @result = @quibbledRequiresAFunction()
      Then -> @result == "loaded a fake function"

describe 'quibble.reset', ->
  describe 'restores original require', ->
    Given -> # The above example group calls quibble.reset()
    Then -> require('module')._load == originalLoad
