const Account = require('../models/').account;

module.exports = {
  list(req, res){
    return Account
      .all()
      .then((accounts) => {res.status(200).send(accounts);})
      .catch((error) => {res.status(500).send(error);});
  }
}