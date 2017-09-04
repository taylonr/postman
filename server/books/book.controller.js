const responses = require('../responses');

const Book = require('../models').book;
const url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

module.exports = {
  list: (req, res) => {
    return Book.all()
      .then(responses.ok(res))
      .catch((err) => {
        responses.serverError(res, err);
      });
  },

  getById(req, res) {
    return Book.findById(req.params.id)
      .then((data) => {
        if(data){
          responses.ok(res)(data);
        } else {
          responses.notFound(res);
        }
      })
      .catch(responses.serverError(res));
  },

  deleteById(req, res) {
    return Book
      .findById(req.params.id)
      .then((acct) => {
        if(!acct){
          return responses.noContent(res);
        }

        return acct
          .destroy()
          .then(responses.noContent(res));
      });
  },

  updateById(req, res) {
    return Book
      .findById(req.params.id)
      .then((acct) => {
        return acct
          .update({
            name: req.body.name
          })
          .then(responses.ok(res));
      });
  },

  create(req, res) {
    return Book
      .create(req.body)
      .then((acct) => {
        acct.dataValues.links = [{
          rel: 'self',
          href: `${fullUrl(req)}/${acct.dataValues.id}`
        }];

        return responses.ok(res)(acct);
      })
      .catch(responses.serverError(res));
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