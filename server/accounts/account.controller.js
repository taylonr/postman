const Account = require('../models/').account;
const responses = require('../responses'),
  ok = responses.ok,
  serverError = responses.serverError,
  noContent = responses.noContent;

const get = (res, resp) => {
  return resp
    .then(ok(res))
    .catch(serverError(res));
}

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
  }
}