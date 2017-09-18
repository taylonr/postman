global.expect = require('chai').expect
global.context = describe
global.xThen = ->

global.pry = require('pryjs')

afterEach -> require('../src/quibble').reset()

