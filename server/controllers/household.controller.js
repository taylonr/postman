const Household = require('../models').household;
const CrudController = require('./crud.controller');

module.exports = new CrudController(Household);