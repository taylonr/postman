const User = require('../models').user;
const CrudController = require('./crud.controller');

module.exports = new CrudController(User);