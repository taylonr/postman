const responses = require('../responses');
const crud = require('../crud');

const Book = require('../models').book;


module.exports = {
  list(req, res) {
      return crud.list(Book, res);
  },

  getById(req, res) {
      return crud.getById(Book, req, res);
  },

  deleteById(req, res) {
      return crud.deleteById(Book, req, res);
  },

  updateById(req, res) {
    return Book
      .findById(req.params.id)
      .then((acct) => {
        return acct
          .update(req.body, {
            where: {id: req.params.id},
            fields: ['title', 'author', 'publicationDate', 'isbn']
          })
          .then(responses.ok(res));
      });
  },

  create(req, res) {
      return crud.create(Book, req, res);
  },

  search(req, res) {
    let where = {};
    if(req.query.title){
      where.title = {
        $ilike: `%${req.query.title}%`
      };
    }

    if(req.query.author){
      where.author = {
        $ilike: `%${req.query.author}%`
      };
    }

    let query = {
      attributes: ['id', 'title', 'author']
    };

    if(Object.keys(where).length !== 0){
      query.where = where;
    }

    return Book
      .findAll(query)
      .then(responses.ok(res))
      .catch(responses.serverError(res));
  }
};