const Account = require('../models/').account;

const ok = res => data => {
  res.status(200).send(data);
};

const serverError = res => err => {
  res.status(500).send(err);
};

const noContent = res => {
  res.status(204).send();
}

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
          return res.status(204).send();
        }

        return acct
          .destroy()
          .then(noContent(res));
      });
  }
}