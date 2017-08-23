const Account = require('../models/').account;
const responses = require('../responses'),
  ok = responses.ok,
  serverError = responses.serverError,
  noContent = responses.noContent;

module.exports = {
  list(req, res){
    return Account
      .all()
      .then(ok(res))
      .catch(serverError(res));
  },

  getById(req, res) {
    return Account
      .findById(req.params.id)
      .then(ok(res))
      .catch(serverError(res));
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