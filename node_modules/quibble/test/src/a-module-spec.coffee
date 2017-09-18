quibble = require('../../src/quibble')
_ = require('lodash')

describe 'quibble', ->
  describe 'un-quibbled', ->
    Given -> @isNumber = require('is-number')
    Then -> @isNumber(5) == true
    And -> @isNumber('pants') == false

  describe 'quibbled to be opposite day', ->
    Given -> @isNumberQuibbleReturn = quibble('is-number', -> !_.isNumber(arguments...))
    Given -> @isNumber = require('is-number')
    Then -> @isNumber(5) == false
    And -> @isNumber('pants') == true
    And -> @isNumberQuibbleReturn(5) == false
    And -> @isNumberQuibbleReturn('pants') == true

    describe 'reset restores things', ->
      Given -> quibble.reset()
      Given -> @isNumber = require('is-number')
      Then -> @isNumber(5) == true
      And -> @isNumber('pants') == false


