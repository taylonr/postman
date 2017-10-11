const responses = require('../responses');
const CrudController = require('./crud.controller');

const Book = require('../models').book;

module.exports = new CrudController(Book, {

  updateById: (req, res) => {
    return Book
      .findById(req.params.id)
      .then((acct) => {
        return acct
          .update(req.body, {
            where: { id: req.params.id },
            fields: ['title', 'author', 'publicationDate', 'isbn']
          })
          .then(responses.ok(res));
      });
  },

  search: (req, res) => {
    let where = {};
    if (req.query.title) {
      where.title = {
        $ilike: `%${req.query.title}%`
      };
    }

    if (req.query.author) {
      where.author = {
        $ilike: `%${req.query.author}%`
      };
    }

    let query = {
      attributes: ['id', 'title', 'author']
    };

    if (Object.keys(where).length !== 0) {
      query.where = where;
    }

    return Book
      .findAll(query)
      .then(responses.ok(res))
      .catch(responses.serverError(res));
  }
});