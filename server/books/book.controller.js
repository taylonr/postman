const responses = require('../responses'),
  ok = responses.ok;

const Book = require('../models').book;

module.exports = {
  list: (req, res) => {
    return Book.all().then(ok(res));
  }
};