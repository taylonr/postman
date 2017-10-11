const crud = require('../crud');

function CrudController(model, additionalMethods = {}) {
  return Object.assign({
    create: crud.create(model),

    list: crud.list(model),

    getById: crud.getById(model),

    deleteById: crud.deleteById(model),
  }, additionalMethods);
}

module.exports = CrudController;