const responses = require('../responses');

const Book = require('../models').book;

module.exports = {
  list: (req, res) => {
    return Book.all()
      .then(responses.ok(res))
      .catch((err) => {
        responses.serverError(res, err);
      });
  }
};