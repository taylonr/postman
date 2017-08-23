const Account = require('../models/').account;

const success = res => data => {
  res.status(200).send(data);
};

const fail = res => err => {
  res.status(500).send(err);
};


module.exports = {
  list(req, res){
    return Account
      .all()
      .then(success(res))
      .catch(fail(res));
  },

  getById(req, res) {
    return Account
      .findById(req.params.id)
      .then(success(res))
      .catch(fail(res));
  }
}