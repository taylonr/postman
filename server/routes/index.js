const accountsController = require('../accounts/account.controller');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the accounts API!',
  }));

  app.delete('/accounts/:id', accountsController.deleteById);
  app.get('/accounts', accountsController.list);
  app.get('/accounts/:id', accountsController.getById);
  app.post('/accounts', accountsController.create);
  app.put('/accounts/:id', accountsController.updateById);
};