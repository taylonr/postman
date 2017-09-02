const Account = require('../models/').account;
const responses = require('../responses'),
  ok = responses.ok,
  serverError = responses.serverError,
  noContent = responses.noContent;
const url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

const get = (res, resp) => {
  return resp
    .then(ok(res))
    .catch(serverError(res));
};

module.exports = {
  list(req, res){
    return get(res, Account.all());
  },

  getById(req, res) {
    return get(res, Account.findById(req.params.id));
  },

  deleteById(req, res) {
    return Account
      .findById(req.params.id)
      .then((acct) => {
        if(!acct){
          return noContent(res);
        }

        return acct
          .destroy()
          .then(noContent(res));
      });
  },

  updateById(req, res) {
    return Account
      .findById(req.params.id)
      .then((acct) => {
        return acct
          .update({
            name: req.body.name
          })
          .then(ok(res));
      });
  },

  create(req, res) {
    return Account
      .create(req.body)
      .then((acct) => {
        acct.dataValues.links = [{
          rel: 'self',
          href: `${fullUrl(req)}/${acct.dataValues.id}`
        }];

        return ok(res)(acct);
      })
      .catch(serverError(res));
  }
};