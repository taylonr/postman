const crud = require('../crud');
const User = require('../models').user;
const Wishlist = require('../models').wishlist;
const responses = require('../responses');
const CrudController = require('./crud.controller');

module.exports = new CrudController(User, {
  create: (req, res) => {
    return Wishlist.create({
      name: `${req.body.firstName}'s List`
    }).then((wishlist) => {
      req.body.wishlistId = wishlist.dataValues.id;
      return crud.create(User)(req, res);
    });
  },
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
      .catch(responses.serverError(res));
  },
  updateById: (req, res) => {
    return User
      .findById(req.params.id)
      .then((user) => {
        return user
          .update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body)
          })
          .then(responses.ok(res));
      });
  }
});