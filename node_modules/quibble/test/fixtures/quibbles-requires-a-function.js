require('coffee-script/register')
var quibble = require('../../src/quibble')
quibble('./a-function', function () { return 'lol' })
