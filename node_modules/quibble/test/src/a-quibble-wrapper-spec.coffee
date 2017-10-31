describe 'something that wraps quibble', ->
  Given -> @subject = require('../fixtures/a-quibble-wrapper')
  Given -> @subject('./should-be-relative-to-test-slash-lib', 'neat')
  When -> @result = require('./should-be-relative-to-test-slash-lib')
  Then -> @result == 'neat'

