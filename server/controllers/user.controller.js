const User = require('../models').user;
const responses = require('../responses');
const CrudController = require('./crud.controller');

module.exports = new CrudController(User, {
  getByHouseholdId: (req, res) => {
    return User.findAll({
      where: {
        householdId: req.params.householdId
      }
    }).then((data) => {
      if (data) {
        responses.ok(res)(data);
      }
      else {
        responses.notFound(res);
      }
    })
    .catch(responses.serverError(res));;
  }
});