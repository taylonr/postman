const responses = require('./responses');

const url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

module.exports = {
  create: model => (req, res)  => {
    return model
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

  deleteById: model => (req, res) => {
    return model
      .findById(req.params.id)
      .then((acct) => {
        if (!acct) {
          return responses.noContent(res);
        }
        return acct
          .destroy()
          .then(responses.noContent(res));
      });
  },

  getById: model => (req, res) => {
    return model.findById(req.params.id)
      .then((data) => {
        if (data) {
          responses.ok(res)(data);
        }
        else {
          responses.notFound(res);
        }
      })
      .catch(responses.serverError(res));
  },

  list: model => (req, res) => {
    return model.all()
      .then(responses.ok(res))
      .catch((err) => {
        responses.serverError(res, err);
      });
  }
}